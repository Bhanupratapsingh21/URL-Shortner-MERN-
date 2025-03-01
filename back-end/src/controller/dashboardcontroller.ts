import { NextFunction, Request, Response } from "express";
import { ApiError, ApiResponse } from "../utils/Responses";
import prisma from "../utils/prishmaconnection";

const getAllLinks = async (req: Request, res: Response, next: NextFunction) => {
    const Id = req.user?.id;

    if (!Id) {
        return next(new ApiError(401, "Unauthorized"));
    }

    try {
        // Fetch links along with redirects count
        const links = await prisma.link.findMany({
            where: { createdById: Id },
            include: {
                redirects: true, // Include redirects to check if active
            }
        });

        // Compute active status for each link
        const formattedLinks = links.map(link => ({
            ...link,
            active: link.redirects.length > 0
        }));

        // Count total links and total redirects
        const totalLinks = links.length;
        const totalRedirects = links.reduce((sum, link) => sum + link.redirects.length, 0);

        res.status(200).json(new ApiResponse(200, {
            links: formattedLinks,
            totalLinks,
            totalRedirects
        }, "Links fetched successfully"));
    } catch (error) {
        next(new ApiError(500, error instanceof Error ? error.message : "An unknown error occurred"));
    }
};

export { getAllLinks };
