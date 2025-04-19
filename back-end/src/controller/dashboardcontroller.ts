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

        // Compute active status for each link, active redirects, and visit count
        const formattedLinks = links.map(({ visitHistory, redirects, ...link }) => {
            // Filter active redirects


            return {
                ...link,
                active: visitHistory.length > 0,
                totalVisits: visitHistory.length, // Total visit count for this link
                activeRedirectsCount: redirects.length // Active redirects count
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



const getAllRedirects = async (req: Request, res: Response, next: NextFunction) => {
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


        res.status(200).json(new ApiResponse(200, { link, redirects }, "Link stats fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

// Fetch stats for a short link
const getLinkStats = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.params;

    if (!shortId) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        // Fetch link data with redirects, visit history count, and device info
        const link = await prisma.link.findUnique({
            where: { shortId },
            include: {
                redirects: true,
                _count: { select: { visitHistory: true } }, // Count total visits
                visitHistory: { select: { timestamp: true, deviceInfo: true } } // Fetch timestamps & device info
            }
        });

        if (!link) {
            return res.status(404).json(new ApiResponse(404, null, "Short URL not found."));
        }

        // Total visit count
        const totalVisits = link._count.visitHistory;

        // Analyze peak visit timestamp
        const visitTimestamps: Record<string, number> = {};
        const deviceCounts: Record<string, number> = {}; // Track device usage

        link.visitHistory.forEach(visit => {
            const hour = new Date(visit.timestamp).getHours().toString().padStart(2, "0") + ":00";
            visitTimestamps[hour] = (visitTimestamps[hour] || 0) + 1;

            // Track device info
            if (visit.deviceInfo) {
                deviceCounts[visit.deviceInfo] = (deviceCounts[visit.deviceInfo] || 0) + 1;
            }
        });

        // Get most common visit hour
        const peakVisitTime = Object.entries(visitTimestamps)
            .sort((a, b) => b[1] - a[1])
            .map(([time, count]) => ({ time, count }))[0] || { time: "N/A", count: 0 };

        // Get top 3 devices
        const topDevices = Object.entries(deviceCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count descending
            .slice(0, 3) // Get top 3
            .map(([device, count]) => ({ device, count }));

        res.status(200).json(new ApiResponse(200, {
            link,
            totalVisits,
            peakVisitTime,
            topDevices
        }, "Link stats fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};


// Fetch stats for a short link
const getChartsdataforLink = async (req: Request, res: Response, next: NextFunction) => {
    const { shortId } = req.params;

    if (!shortId) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        // Fetch link data with redirects, visit history count, and device info
        const link = await prisma.link.findUnique({
            where: { shortId },
            include: {
                redirects: true,
                _count: { select: { visitHistory: true } }, // Count total visits
                visitHistory: { select: { timestamp: true, deviceInfo: true } } // Fetch timestamps & device info
            }
        });

        if (!link) {
            return res.status(404).json(new ApiResponse(404, null, "Short URL not found."));
        }

        // Total visit count
        const totalVisits = link._count.visitHistory;

        // Analyze peak visit timestamp
        const visitTimestamps: Record<string, number> = {};
        const deviceCounts: Record<string, number> = {}; // Track device usage

        link.visitHistory.forEach(visit => {
            const hour = new Date(visit.timestamp).getHours().toString().padStart(2, "0") + ":00";
            visitTimestamps[hour] = (visitTimestamps[hour] || 0) + 1;

            // Track device info
            if (visit.deviceInfo) {
                deviceCounts[visit.deviceInfo] = (deviceCounts[visit.deviceInfo] || 0) + 1;
            }
        });

        // Get most common visit hour
        const peakVisitTime = Object.entries(visitTimestamps)
            .sort((a, b) => b[1] - a[1])
            .map(([time, count]) => ({ time, count }))[0] || { time: "N/A", count: 0 };

        // Get top 3 devices
        const topDevices = Object.entries(deviceCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count descending
            .slice(0, 3) // Get top 3
            .map(([device, count]) => ({ device, count }));

        res.status(200).json(new ApiResponse(200, {
            link,
            totalVisits,
            peakVisitTime,
            topDevices
        }, "Link stats fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

const getAllLinksAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { days = 90 } = req.query; // Default to 30 days of data

    if (!userId) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        // Calculate date range
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - Number(days));

        // Fetch all links with visit history within date range
        const links = await prisma.link.findMany({
            where: { createdById: userId },
            include: {
                visitHistory: {
                    where: {
                        timestamp: {
                            gte: startDate,
                            lte: endDate
                        }
                    },
                    select: {
                        timestamp: true,
                        deviceInfo: true
                    }
                },
                redirects: {
                    select: {
                        id: true
                    }
                }
            }
        });

        // Initialize data structures
        const dateMap: Record<string, { desktop: number; mobile: number; tablet: number }> = {};
        const timeMap: Record<string, number> = {};
        const deviceCounts = {
            desktop: 0,
            mobile: 0,
            tablet: 0
        };
        let totalClicks = 0;
        let previousPeriodClicks = 0;

        // Get previous period data for growth calculation
        const previousEndDate = new Date(startDate);
        const previousStartDate = new Date(startDate);
        previousStartDate.setDate(previousStartDate.getDate() - Number(days));

        const previousLinks = await prisma.link.findMany({
            where: { createdById: userId },
            include: {
                visitHistory: {
                    where: {
                        timestamp: {
                            gte: previousStartDate,
                            lte: previousEndDate
                        }
                    },
                    select: {
                        id: true
                    }
                }
            }
        });

        previousPeriodClicks = previousLinks.reduce(
            (sum, link) => sum + link.visitHistory.length,
            0
        );

        // Process all visits from all links
        links.forEach(link => {
            link.visitHistory.forEach(visit => {
                totalClicks++;

                const dateStr = visit.timestamp.toISOString().split('T')[0];
                const hour = visit.timestamp.getHours().toString().padStart(2, "0") + ":00";

                // Initialize date entry if not exists
                if (!dateMap[dateStr]) {
                    dateMap[dateStr] = { desktop: 0, mobile: 0, tablet: 0 };
                }

                // Count time occurrences
                timeMap[hour] = (timeMap[hour] || 0) + 1;

                // Categorize device
                const deviceInfo = visit.deviceInfo.toLowerCase();
                if (deviceInfo.includes('mobile')) {
                    dateMap[dateStr].mobile++;
                    deviceCounts.mobile++;
                } else if (deviceInfo.includes('tablet')) {
                    dateMap[dateStr].tablet++;
                    deviceCounts.tablet++;
                } else {
                    dateMap[dateStr].desktop++;
                    deviceCounts.desktop++;
                }
            });
        });

        // Convert date map to sorted array
        const analyticsData = Object.entries(dateMap)
            .map(([date, counts]) => ({
                date,
                desktop: counts.desktop,
                mobile: counts.mobile,
                tablet: counts.tablet
            }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        // Calculate peak visit time
        const peakTimeEntry = Object.entries(timeMap)
            .sort((a, b) => b[1] - a[1])[0] || ["N/A", 0];

        // Calculate growth percentage
        const growth = previousPeriodClicks > 0
            ? Math.round(((totalClicks - previousPeriodClicks) / previousPeriodClicks) * 100)
            : totalClicks > 0 ? 100 : 0;

        // Format device stats
        const deviceStats = [
            {
                device: "Mobile",
                percentage: Math.round((deviceCounts.mobile / totalClicks) * 100),
                count: deviceCounts.mobile,
                icon: "IconDeviceMobile"
            },
            {
                device: "Desktop",
                percentage: Math.round((deviceCounts.desktop / totalClicks) * 100),
                count: deviceCounts.desktop,
                icon: "IconDeviceDesktop"
            },
            {
                device: "Tablet",
                percentage: Math.round((deviceCounts.tablet / totalClicks) * 100),
                count: deviceCounts.tablet,
                icon: "IconDeviceTablet"
            }
        ];

        // Get total links and redirects
        const totalLinks = links.length;
        const totalRedirects = links.reduce((sum, link) => sum + link.redirects.length, 0);

        res.status(200).json(new ApiResponse(200, {
            analyticsData,
            totalClicks,
            clicksGrowth: growth,
            deviceStats,
            totalLinks,
            totalRedirects,
            peakVisitTime: {
                time: peakTimeEntry[0],
                count: peakTimeEntry[1]
            },
            title: "All Links Analytics",
            description: `Aggregated analytics for all your links`
        }, "Analytics data fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

export {
    getAllLinks,
    getAllRedirects,
    getLinkStats,
    getChartsdataforLink,
    getAllLinksAnalytics
};
