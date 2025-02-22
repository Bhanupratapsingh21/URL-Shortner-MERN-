import { ApiError } from "../utils/Responses";  // Fixed spelling of "utils"
import { Request, Response, NextFunction } from "express";
import User from "types/user.type";
import prisma from "../utils/prishmaconnection";
import { verifyTokenAccesstoken } from "../utils/jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

        if (!accessToken) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        const decodedToken = await verifyTokenAccesstoken(accessToken) as User;

        const user = await prisma.user.findFirst({
            where: { id: decodedToken.id as string }
        });

        if (user) {
            const { password, refreshToken, ...userData } = user;
            req.user = userData;  // Make sure to extend Express Request type to include user
        } else {
            throw new ApiError(404, "User not found");
        }

        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json(new ApiError(401, "Unauthorized"));
        return
    }
};