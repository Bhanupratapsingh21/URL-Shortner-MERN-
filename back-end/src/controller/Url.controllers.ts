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

// Create a redirect for a short link
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

        existingRedirects.forEach((existingRedirect) => {
            const existingStartTime = new Date(`1970-01-01T${existingRedirect.startTime}`);
            const existingEndTime = new Date(`1970-01-01T${existingRedirect.endTime}`);

            if (
                (parsedStartTime >= existingStartTime && parsedStartTime < existingEndTime) || // Overlaps at start
                (parsedEndTime > existingStartTime && parsedEndTime <= existingEndTime) ||    // Overlaps at end
                (parsedStartTime <= existingStartTime && parsedEndTime >= existingEndTime)    // Fully overlaps
            ) {
                throw new ApiError(400, "Redirect time overlaps with an existing redirect.");
            }
        });

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

// Handle redirection based on time
const redirectOptimized = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.params;

    try {
        const link = await prisma.link.findUnique({ where: { shortId } });

        if (!link) {
            return next(new ApiError(404, "ShortId not found"));
        }

        const redirect = await prisma.redirect.findFirst({
            where: {
                linkId: link.id,
                startTime: { lte: new Date().toISOString().slice(11, 16) },
                endTime: { gte: new Date().toISOString().slice(11, 16) },
            },
        });

        if (!redirect) {
            return next(new ApiError(404, "No redirect found for this shortId"));
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

// Fetch stats for a short link
const getLinkStats = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.params;

    try {
        const link = await prisma.link.findUnique({ where: { shortId } });

        if (!link) {
            return res.status(404).json(new ApiResponse(404, null, "Short URL not found."));
        }

        if (link.createdById !== req.user?.id) {
            return next(new ApiError(401, "Unauthorized"));
        }

        const redirects = await prisma.redirect.findMany({ where: { linkId: link.id } });
        const visits = await prisma.visitHistory.findMany({ where: { linkId: link.id } });

        res.status(200).json(new ApiResponse(200, { link, redirects, visits }, "Link stats fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

export {
    createLink,
    createRedirect,
    redirectOptimized,
    getLinkStats,
};
