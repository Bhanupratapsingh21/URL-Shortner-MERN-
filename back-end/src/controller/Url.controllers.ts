import { NextFunction, Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/Responses";
import prisma from "../utils/prishmaconnection";

// Generate a unique short ID
const genrateShortId = async (): Promise<string> => {
    const shortId = Math.random().toString(36).substring(2, 7);
    const link = await prisma.link.findUnique({ where: { shortId } });
    if (link) {
        return genrateShortId();
    }
    return shortId;
};

const isOverlapping = (newStart: Date, newEnd: Date, existStart: Date, existEnd: Date) => {
    // Handle cases crossing midnight
    if (existStart > existEnd) {
        // Existing redirect crosses midnight
        return (newStart >= existStart || newStart < existEnd) ||
            (newEnd >= existStart || newEnd < existEnd);
    } else if (newStart > newEnd) {
        // New redirect crosses midnight
        return (existStart >= newStart || existStart < newEnd) ||
            (existEnd >= newStart || existEnd < newEnd);
    } else {
        // Normal case (within same day)
        return !(newEnd <= existStart || newStart >= existEnd);
    }
};

// Check if a short ID already exists
const checkforShortId = async (shortId: string) => {
    return await prisma.link.findUnique({ where: { shortId } });
};

// Validate time format (HH:mm)
const isValidTime = (time: string): boolean => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // Matches HH:mm format
    return timeRegex.test(time);
};

// Create a short link
const createLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { shortIdfromuser } = req.body;

        if (!req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        let shortId: string;

        if (shortIdfromuser) {
            if (await checkforShortId(shortIdfromuser)) {
                return next(new ApiError(400, "ShortId already exists"));
            }
            shortId = shortIdfromuser;
        } else {
            shortId = await genrateShortId();
        }

        const link = await prisma.link.create({
            data: {
                shortId,
                createdById: req.user.id,
            },
        });

        res.status(201).json(new ApiResponse(201, link, "Short link created successfully. Please set up a redirect to it."));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

const createRedirect = async (req: Request, res: Response, next: NextFunction) => {
    const { originalUrl, shortId, startTime, endTime } = req.body;

    if (!originalUrl || !shortId || !startTime || !endTime) {
        return next(new ApiError(400, "Missing required fields"));
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        return next(new ApiError(400, "Invalid time format. Expected format: HH:mm"));
    }

    try {
        const link = await prisma.link.findUnique({ where: { shortId } });

        if (!link) {
            return next(new ApiError(404, "ShortId not found"));
        }

        if (link.createdById !== req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        const existingRedirects = await prisma.redirect.findMany({ where: { linkId: link.id } });

        const parsedStartTime = new Date(`1970-01-01T${startTime}:00`);
        const parsedEndTime = new Date(`1970-01-01T${endTime}:00`);

        const hasOverlap = existingRedirects.some(existingRedirect => {
            const existingStartTime = new Date(`1970-01-01T${existingRedirect.startTime}`);
            const existingEndTime = new Date(`1970-01-01T${existingRedirect.endTime}`);

            return isOverlapping(parsedStartTime, parsedEndTime, existingStartTime, existingEndTime);
        });

        if (hasOverlap) {
            return next(new ApiError(400, "Redirect time overlaps with an existing redirect."));
        }

        const redirect = await prisma.redirect.create({
            data: {
                url: originalUrl,
                linkId: link.id,
                startTime,
                endTime,
            },
        });

        res.status(201).json(new ApiResponse(201, redirect, "Redirect created successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};


const redirectOptimized = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.params;

    try {
        const link = await prisma.link.findUnique({ where: { shortId } });

        if (!link) {
            return next(new ApiError(404, "ShortId not found"));
        }

        // Get current time in HH:mm format
        const currentTime = new Date().toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });

        // Function to check if current time is within a time range, handling midnight crossover
        const isTimeInRange = (startTime: string, endTime: string): boolean => {
            // Convert times to Date objects for easier comparison
            const start = new Date(`1970-01-01T${startTime}:00`);
            const end = new Date(`1970-01-01T${endTime}:00`);
            const current = new Date(`1970-01-01T${currentTime}:00`);

            // Handle case where end time is earlier than start time (crosses midnight)
            if (end < start) {
                return current >= start || current <= end;
            }

            // Normal case within same day
            return current >= start && current <= end;
        };

        const redirects = await prisma.redirect.findMany({
            where: {
                linkId: link.id
            }
        });

        // Find the first redirect that matches the current time
        const redirect = redirects.find(r => isTimeInRange(r.startTime, r.endTime));

        if (!redirect) {
            return next(new ApiError(404, `No active redirect found for ${currentTime}`));
        }

        // Detect user device
        const userAgent = req.headers['user-agent'] || "Unknown";
        let deviceType = 'Unknown';
        if (/mobile/i.test(userAgent)) {
            deviceType = 'Mobile';
        } else if (/tablet|iPad/i.test(userAgent)) {
            deviceType = 'Tablet';
        } else if (/Macintosh|Windows NT|Linux/i.test(userAgent)) {
            deviceType = 'Desktop';
        }

        // Extract client IP address
        const forwardedFor = Array.isArray(req.headers['x-forwarded-for']) ? req.headers['x-forwarded-for'][0] : req.headers['x-forwarded-for'];
        const ipAddress = forwardedFor?.split(',')[0] || req.ip || "Unknown";

        // Log the visit in visitHistory
        await prisma.visitHistory.create({
            data: {
                linkId: link.id,
                ipAddress,
                deviceInfo: deviceType,
                timestamp: new Date(), // Use a full DateTime object
            },
        });

        // Redirect the user to the original URL
        res.status(302).redirect(redirect.url);
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};
const editRedirect = async (req: Request, res: Response, next: NextFunction) => {
    const { redirectId, originalUrl, startTime, endTime } = req.body;

    if (!redirectId || !originalUrl || !startTime || !endTime) {
        return next(new ApiError(400, "Missing required fields"));
    }

    if (!isValidTime(startTime) || !isValidTime(endTime)) {
        return next(new ApiError(400, "Invalid time format. Expected format: HH:mm"));
    }

    try {
        // Find the redirect to edit
        const redirect = await prisma.redirect.findUnique({
            where: { id: redirectId },
            include: { link: true } // Include the associated link
        });

        if (!redirect) {
            return next(new ApiError(404, "Redirect not found"));
        }

        // Check if the user owns the associated link
        if (redirect.link.createdById !== req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        const parsedStartTime = new Date(`1970-01-01T${startTime}:00`);
        const parsedEndTime = new Date(`1970-01-01T${endTime}:00`);

        // Check for time overlaps with other redirects (excluding current redirect)
        const existingRedirects = await prisma.redirect.findMany({
            where: {
                linkId: redirect.linkId,
                NOT: { id: redirectId } // Exclude current redirect
            }
        });

        const hasOverlap = existingRedirects.some(existingRedirect => {
            const existingStartTime = new Date(`1970-01-01T${existingRedirect.startTime}`);
            const existingEndTime = new Date(`1970-01-01T${existingRedirect.endTime}`);

            return isOverlapping(parsedStartTime, parsedEndTime, existingStartTime, existingEndTime);
        });

        if (hasOverlap) {
            return next(new ApiError(400, "New redirect time overlaps with an existing redirect."));
        }

        // Update the redirect
        const updatedRedirect = await prisma.redirect.update({
            where: { id: redirectId },
            data: {
                url: originalUrl,
                startTime,
                endTime,
            },
        });

        res.status(200).json(new ApiResponse(200, updatedRedirect, "Redirect updated successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

const deleteLink = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.query as { shortId: string };

    try {
        const link = await prisma.link.findUnique({ where: { shortId } });

        if (!link) {
            return next(new ApiError(404, "ShortId not found"));
        }

        if (link.createdById !== req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        // Delete all related data (visit history and redirects) in a transaction
        await prisma.$transaction([
            prisma.visitHistory.deleteMany({ where: { linkId: link.id } }),
            prisma.redirect.deleteMany({ where: { linkId: link.id } }),
            prisma.link.delete({ where: { id: link.id } })
        ]);

        res.status(200).json(new ApiResponse(200, null, "Link and all associated data deleted successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

const deleteRedirect = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId, redirectId } = req.query as { shortId: string; redirectId: string };

    try {
        // First verify the link exists and user owns it
        const link = await prisma.link.findUnique({
            where: { shortId },
            include: {
                redirects: {
                    where: { id: redirectId }
                }
            }
        });

        if (!link) {
            return next(new ApiError(404, "ShortId not found"));
        }

        if (link.createdById !== req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        // Check if the redirect exists
        if (link.redirects.length === 0) {
            return next(new ApiError(404, "Redirect not found for this short link"));
        }

        // Delete the redirect
        await prisma.redirect.delete({
            where: { id: redirectId }
        });

        // No need to manually filter the Link.redirects array because:
        // 1. Prisma automatically maintains the relationship
        // 2. The next time you query the link with redirects, it will only include existing ones
        // 3. In-memory arrays should be refreshed from the database anyway

        res.status(200).json(new ApiResponse(200, null, "Redirect deleted successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};




const getLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, shortId } = req.query;

        if (!id && !shortId) {
            return next(new ApiError(400, "Either id or shortId must be provided"));
        }

        // Find the link by either id or shortId
        const link = await prisma.link.findUnique({
            where: {
                ...(id ? { id: String(id) } : { shortId: String(shortId) })
            },
            include: {
                redirects: {
                    orderBy: {
                        startTime: 'asc' // Order redirects by start time
                    }
                },
                _count: {
                    select: {
                        visitHistory: true // Include visit count
                    }
                }
            }
        });

        if (!link) {
            return next(new ApiError(404, "Link not found"));
        }

        // Transform the response data
        const responseData = {
            id: link.id,
            shortId: link.shortId,
            createdAt: link.createdAt,
            redirects: link.redirects,
            totalVisits: link._count.visitHistory,
            // Add any other relevant fields
        };

        res.status(200).json(new ApiResponse(200, responseData, "Link retrieved successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};


export {
    createLink,
    createRedirect,
    redirectOptimized,
    editRedirect,
    deleteLink,
    getLink,
    deleteRedirect
};
