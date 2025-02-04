import jwt from "jsonwebtoken";
import prisma from "../utills/prisma.js";

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();

        if (!token) {
            return res.status(401).json({ message: "Unauthorized Request" });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId },
            select: {
                id: true,
                username: true,
                email: true,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Error in verifyJwt middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
