import { NextFunction, Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/Responses";
import prisma from "../utils/prishmaconnection";

const getAllLinks = async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.user?.id;

    if (!Id) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        // Fetch links with redirects and visit history (but not sending visitHistory)
        const links = await prisma.link.findMany({
            where: { createdById: Id },
            include: {
                redirects: true,  // Include redirects to check if active
                visitHistory: { select: { timestamp: true, deviceInfo: true } } // Only fetch required fields for analytics
            }
        });

        const currentTime = new Date();
        const currentHourMinute = currentTime.toISOString().slice(11, 16); // Extract HH:mm format

        // Compute active status for each link, active redirects, and visit count
        const formattedLinks = links.map(({ visitHistory, redirects, ...link }) => {
            // Filter active redirects
            const activeRedirects = redirects.filter(redirect => {
                return redirect.startTime <= currentHourMinute && redirect.endTime >= currentHourMinute;
            });

            return {
                ...link,
                active: visitHistory.length > 0,
                totalVisits: visitHistory.length, // Total visit count for this link
                activeRedirectsCount: activeRedirects.length // Active redirects count
            };
        });

        // Count total links and total redirects
        const totalLinks = links.length;
        const totalRedirects = links.reduce((sum, link) => sum + link.redirects.length, 0);

        // Count total visits
        const totalVisits = links.reduce((sum, link) => sum + link.visitHistory.length, 0);

        // Analyze visit devices
        const deviceCounts: Record<string, number> = {};
        links.forEach(link => {
            link.visitHistory.forEach(visit => {
                deviceCounts[visit.deviceInfo] = (deviceCounts[visit.deviceInfo] || 0) + 1;
            });
        });

        // Get top devices (sorted)
        const topDevices = Object.entries(deviceCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count descending
            .slice(0, 3) // Get top 3
            .map(([device, count]) => ({ device, count }));

        // Analyze peak visit timestamp
        const visitTimestamps: Record<string, number> = {};
        links.forEach(link => {
            link.visitHistory.forEach(visit => {
                const hour = new Date(visit.timestamp).getHours().toString().padStart(2, "0") + ":00";
                visitTimestamps[hour] = (visitTimestamps[hour] || 0) + 1;
            });
        });

        // Get most common visit hour
        const peakVisitTime = Object.entries(visitTimestamps)
            .sort((a, b) => b[1] - a[1]) // Sort by count descending
            .map(([time, count]) => ({ time, count }))[0] || { time: "N/A", count: 0 };

        res.status(200).json(new ApiResponse(200, {
            links: formattedLinks, // Links with 'active' field, 'totalVisits', and 'activeRedirectsCount'
            totalLinks,
            totalRedirects,
            totalVisits,
            topDevices,
            peakVisitTime
        }, "Links fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

export { getAllLinks };
