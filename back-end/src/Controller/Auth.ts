import { NextFunction, Request, Response } from 'express';
import { ApiError, ApiResponse } from '../utils/Responses';
import { generateAccessToken, generateRefreshToken, verifyTokenRefreshtoken } from '../utils/jwt';
import { hashPassword, validatePassword } from '../utils/Bcrypt';
import prisma from '../utils/prishmaconnection';
import user from 'types/user.type';

interface SignupRequest {
    username: string;
    email: string;
    password: string;
}
const generateTokens = async (user: user) => {
    try {
        const { password, refreshToken: oldRefreshToken, ...safeUser }: Partial<user> = user;
        const accessToken = await generateAccessToken(safeUser);
        const refreshToken = await generateRefreshToken(safeUser);
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken }
        });
        if (!updatedUser) {
            throw new ApiError(500, "Token generation failed");
        }

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new ApiError(500, "Token generation failed");
    }
};

const signup = async (
    req: Request<{}, {}, SignupRequest>,
    res: Response,
    next: NextFunction
) => {
    const { username, email, password } = req.body;

    try {
        // Validate input
        if (!username?.trim() || !email?.trim() || !password?.trim()) {
            throw new ApiError(400, "Invalid input: All fields are required.");
        }

        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }],
            },
        });

        if (existingUser) {
            throw new ApiError(
                401,
                existingUser.username === username
                    ? "Username already exists."
                    : "Email already exists."
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                refreshToken: ''
            },
        });

        // Extract safe user data
        const { password: _, refreshToken: __, ...safeUser } = user;

        // Generate tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateTokens(user);
        console.log("coder block runed")
        // Send response
        return res
            .status(201)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
            .cookie("refreshToken", newRefreshToken, { httpOnly: true, secure: true })
            .json(
                new ApiResponse(
                    201,
                    {
                        ...safeUser,
                        accessToken,
                        refreshToken: newRefreshToken
                    },
                    "User created successfully."
                )
            );
    } catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        console.error("Unexpected error:", error);
        return next(new ApiError(500, "Something went wrong.", error as Error));
    }
};

// Welcome route with proper typing
const welcome = async (_req: Request, res: Response) => {
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Welcome to the URL Shortener App!"));
};


const login = async (req: Request, res: Response) => {
    const { identifier, password } = req.body;

    if (!identifier && !password) {
        throw new ApiError(400, "Invalid input: All fields are required.");
    }

    const user = await prisma.user.findFirst({
        where: {
            OR: [{ username: identifier }, { email: identifier }],
        },
    });

    if (!user) {
        throw new ApiError(404, "User Not Found.");
    }

    const passwordMatch = await validatePassword(password, user.password);

    if (!passwordMatch) {
        throw new ApiError(401, "Invalid Password.");
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    const { password: _, refreshToken: __, ...safeUser } = user;

    return res
        .status(200)
        .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
        .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
        .json(
            new ApiResponse(
                200,
                {
                    ...safeUser,
                    accessToken,
                    refreshToken
                },
                "Login successful."
            )
        );

}

const logout = async (req: Request, res: Response) => {

    if (!req.user) {
        throw new ApiError(401, "Unauthorized");
    }

    await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            refreshToken: '',
        }
    })

    return res.status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, null, "Logout successful."));

}

const refreshAccessToken = async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized");
    }
    try {

        const decodedToken = await verifyTokenRefreshtoken(incomingRefreshToken);

        if (typeof decodedToken === 'string') {
            throw new ApiError(401, "Unauthorized");
        }


        if (!decodedToken) {
            throw new ApiError(401, "Unauthorized");
        }


        const user = await prisma.user.findFirst({
            where: {
                refreshToken: incomingRefreshToken,
            },
        });


        if (!user) {
            throw new ApiError(401, "Unauthorized");
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        return res
            .status(200)
            .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
            .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken
                    },
                    "Access token refreshed."
                )
            );
    } catch (error) {
        console.log("Error refreshing access token:", error);
        throw new ApiError(500, "Token refresh failed.", error);
    }

}

const changeuserCurrentPassword = async (req: Request, res: Response) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "Invalid input: All fields are required.");
    }

    if (oldPassword === newPassword) {
        throw new ApiError(400, "Invalid input: New password must be different from the old password.");
    }

    if (req.user === undefined || req.user.id === null) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: req.user.id,
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const passwordMatch = await validatePassword(oldPassword, user.password);

    if (!passwordMatch) {
        throw new ApiError(401, "Invalid credentials.");
    }

    user.password = await hashPassword(newPassword);

    await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            password: user.password,
        }
    });
    return res.status(200).json(new ApiResponse(200, "User password changed successfully."));

}

const changeusername = async (req: Request, res: Response) => {
    const { username, newusername, password } = req.body;

    if (!username || !password || !newusername) {
        throw new ApiError(400, "Invalid input: All fields are required.");
    }

    if (username === newusername) {
        throw new ApiError(400, "Invalid input: New username must be different from the old Username.");
    }

    if (req.user === undefined || req.user.id === null) {
        throw new ApiError(401, "Unauthorized");
    }

    const user = await prisma.user.findFirst({
        where: {
            id: req.user.id,
        }
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }



    const passwordMatch = await validatePassword(password, user.password);

    if (!passwordMatch) {
        throw new ApiError(401, "Invalid credentials.");
    }

    const existingUser = await prisma.user.findFirst({
        where: { username },
    });

    if (existingUser?.username === newusername) {
        throw new ApiError(
            401,
            "Username already exists."
        );
    }


    await prisma.user.update({
        where: {
            id: req.user.id,
        },
        data: {
            username: newusername,
        }
    });

    return res.status(200).json(new ApiResponse(200, "Username changed successfully."));
}

const getuser = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            throw new ApiError(401, "Unauthorized");
        }
        const user = await prisma.user.findFirst({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                username: true,
                email: true,
            }
        });
        if (!user) {
            throw new ApiError(404, "User not found.");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, user, "User details fetched successfully."));
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "Internal Server Error", error);
    }
}


export {
    signup,
    welcome,
    login,
    logout,
    refreshAccessToken,
    changeuserCurrentPassword,
    changeusername,
    getuser,
};