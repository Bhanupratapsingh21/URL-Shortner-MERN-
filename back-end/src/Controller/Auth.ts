import { Request, Response } from 'express';
import { ApiError, ApiResponse } from '../utills/Responses'; // Correct import
import { generateAccessToken, generateRefreshToken } from '../utills/jwt';
import { hashPassword } from '../utills/Bcrypt';
import prisma from '../utills/prishmaconnection';

const generateAccessandRefreshToken = async (user: any) => {
    try {
        const accessToken = await generateAccessToken(user);
        const refreshToken = await generateRefreshToken(user);

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating access and refresh token:", error);
        throw new Error("Token generation failed");
    }
}

const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res
                .status(400)
                .json(new ApiError(400, "Invalid input: All fields are required.").toJson());
        }

        // Check if the user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res
                .status(401)
                .json(
                    new ApiError(
                        401,
                        existingUser.username === username
                            ? "Username already exists."
                            : "Email already exists."
                    ).toJson()
                );
        }

        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword, refreshToken: '' },
        });

        // Exclude sensitive fields
        const { password: _, ...safeUser } = user;

        const { accessToken, refreshToken } = await generateAccessandRefreshToken(user);

        if (!accessToken || !refreshToken) {
            return res.status(500).json(new ApiError(500, "Token generation failed").toJson());
        }

        return res
            .status(201)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(new ApiResponse(201, { safeUser, accessToken, refreshToken }, "User created successfully.").toJson());
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return res.status(500).json({ success: false, error: errorMessage });
    }
}

export { signup };
