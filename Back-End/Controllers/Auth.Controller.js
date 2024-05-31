import { User } from "../Models/User.models.js"
import jwt from "jsonwebtoken"

// for genrate Access to token and refresh tokens
const genrateAccessTokenandRefreshtokens = async (userid) => {
    try {
        const user = await User.findById(userid)
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        throw new console.error("500 Something want wrong in genrate tokens", error)
    }
}

async function handleUserLogin(req, res) {
    const { email, name, password } = req.body;

    if (!name && !email) {
        return res.status(400).json({ "MSG": "Name or Email is required" });
    }

    try {
        const user = await User.findOne({
            $or: [{ name }, { email }]
        });

        if (!user) {
            return res.status(404).json({ "MSG": "User not found" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);

        if (!isPasswordValid) {
            return res.status(401).json({ "MSG": "Invalid user credentials" });
        }

        const { accessToken, refreshToken } = await genrateAccessTokenandRefreshtokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: false, // Secure in production, false in development
            sameSite: 'None' 
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                MSG: "User logged in successfully",
                data: { accessToken }
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "MSG": "Server error" });
    }

}

// added a save method in models so when i save password it got incrypts

async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        if (!name?.trim() || !email?.trim() || !password?.trim()) {
            return res.status(400).json({ "msg": "All fields are required" });
        }

        const existingUser = await User.findOne({
            $or: [{ name }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({ "msg": "Name or Email already exists" });
        }

        const user = new User({
            name,
            email,
            password,
        });

        await user.save();

        const { accessToken, refreshToken } = await genrateAccessTokenandRefreshtokens(user._id);

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: false, // Secure in production, false in development
            sameSite: 'None' // Ensure cross-origin cookies work
        };

        if (!loggedInUser) {
            return res.status(500).json({ "msg": "Something went wrong while registering user" });
        }

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                MSG: "User registered successfully",
                data: { accessToken }
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "msg": "Server error" });
    }
}

async function refreshAccessToken(req, res) {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    // Check if token is present
    if (!incomingRefreshToken) {
        return res.status(401).json({ msg: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({ msg: "Invalid refresh token" });
        }
        // for some checking perposes console.log(user.refreshToken)
        // Check if the user's refresh token matches the received token
        if (incomingRefreshToken !== user.refreshToken) {
            return res.status(401).json({ msg: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: false, // Secure in production, false in development
            sameSite: 'None' // Ensure cross-origin cookies work
        };

        const { accessToken, refreshToken } = await genrateAccessTokenandRefreshtokens(user._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                msg: "Access and refresh token issued successfully",
                data: {
                    accessToken,
                    refreshToken,
                },
            });

    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ msg: "Server error" });
    }

}

// always wrap in try catch
async function LogoutUser(req, res) {
    // so in req we dont have auccces to user but we dont have id etc so let create a middleware 
    // for it 
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        })
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("refreshToken", options)
        .clearCookie("accessToken", options)
        .json({ MSG: "User Logged Out" })
}

async function getCurrentUser(req, res) {
    return res.status(200).json({ "MSG": "Current User Fatched Successfully", "Data": req.user })
}

export {
    handleUserSignUp,
    handleUserLogin,
    getCurrentUser,
    refreshAccessToken,
    LogoutUser,
}
