import jwt from 'jsonwebtoken';
import prisma from '../utills/prisma.js';
import {
    generateRefreshToken,
    generateAccessToken
} from '../utills/jwt.js';
import { hashPassword } from '../utills/bcryptworker.js';
import {
    alreadyExists,
    dataValiationFailed,
    tokensGenerationError,
    userCreationSuccess,
    internalServerError,
    userCreationFailure
} from '../Constants/en/responses.js';
import { ResponseStatusCode as statusCodes } from '../Constants/StatusCodes.js';
import { ApiResponse } from '../utills/apiResponse.js';
import { ApiError } from '../utills/apiError.js';
import isValidEmail from '../utills/VaildEmail.js';
import isValidPassword from '../utills/Vaildpassword.js';

const generateAccessTokenAndRefreshTokens = async (userId) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await prisma.user.update({
            where: { id: userId },
            data: { refreshToken },
        });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error(tokensGenerationError, error);
        throw new Error(tokensGenerationError);
    }
};

// Handle User Login
async function handleUserLogin(req, res) {
    const { email, name, password } = req.body;

    if (!name && !email) {
        return res.status(400).json({ "MSG": "Name or Email is required" });
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [{ name }, { email }],
            },
        });

        if (!user) {
            return res.status(404).json({ "MSG": "User not found" });
        }

        const isPasswordValid = await validatePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ "MSG": "Invalid user credentials" });
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user.id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 2 * 24 * 60 * 60 * 1000,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                MSG: "User logged in successfully",
                data: { accessToken },
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "MSG": "Server error" });
    }
}
async function handleUserSignUp(req, res) {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json(new ApiError(statusCodes.BAD_REQUEST, "Invalid input: All fields are required.").toJson());
        }

        // Additional validation (e.g., email format, password strength)
        if (!isValidEmail(email)) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json(new ApiError(statusCodes.BAD_REQUEST, "Invalid email format.").toJson());
        }

        if (!isValidPassword(password)) {
            return res
                .status(statusCodes.BAD_REQUEST)
                .json(new ApiError(statusCodes.BAD_REQUEST, "Password does not meet complexity requirements.").toJson());
        }

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            return res
                .status(statusCodes.CONFLICT)
                .json(
                    new ApiError(
                        statusCodes.CONFLICT,
                        existingUser.username === username
                            ? "Username already exists."
                            : "Email already exists."
                    ).toJson()
                );
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create the user
        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        // Exclude sensitive fields
        const { password: _, ...safeUser } = user;

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user);

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
        };

        // Respond with success
        return res
            .status(statusCodes.CREATED)
            .cookie("accessToken", accessToken, cookieOptions)
            .cookie("refreshToken", refreshToken, cookieOptions)
            .json({
                success: true,
                statusCode: statusCodes.CREATED,
                message: "User created successfully.",
                data: { user: safeUser, accessToken, refreshToken },
            });
    } catch (error) {
        // Handle known Prisma errors
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                // Unique constraint violation
                return res
                    .status(statusCodes.CONFLICT)
                    .json(
                        new ApiError(
                            statusCodes.CONFLICT,
                            "A user with the provided email or username already exists."
                        ).toJson()
                    );
            }
        }

        // Log the error with context
        console.error("Error during user signup:", {
            error: error.message,
            stack: error.stack,
            input: { username, email }, // Avoid logging sensitive fields like password
        });

        // Return generic API error
        return res
            .status(statusCodes.INTERNAL_SERVER_ERROR)
            .json(
                new ApiError(
                    statusCodes.INTERNAL_SERVER_ERROR,
                    "Internal Server Error. Please try again later.",
                    [error.message]
                ).toJson()
            );
    }
}

// Refresh Access Token
async function refreshAccessToken(req, res) {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(401).json({ msg: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decodedToken.userId } });

        if (!user || incomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({ msg: "Invalid or expired refresh token" });
        }

        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user.id);

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 2 * 24 * 60 * 60 * 1000,
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                msg: "Access and refresh token issued successfully",
                data: { accessToken, refreshToken },
            });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ msg: "Server error" });
    }
}

// Handle User Logout
async function LogoutUser(req, res) {
    const userId = req.user.id;

    await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
    });

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 2 * 24 * 60 * 60 * 1000,
    };

    return res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({ MSG: "User Logged Out" });
}

// Get Current User
async function getCurrentUser(req, res) {
    return res.status(200).json({ "MSG": "Current User Fetched Successfully", "Data": req.user });
}

export {
    handleUserSignUp,
    handleUserLogin,
    getCurrentUser,
    refreshAccessToken,
    LogoutUser,
};
