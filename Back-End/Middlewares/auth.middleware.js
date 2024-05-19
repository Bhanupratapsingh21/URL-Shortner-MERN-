import jwt from "jsonwebtoken"
import { User } from "../Models/User.models.js"

export const verifyjwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")

        if (!token) return res.status(401).json({ "MSG": "UnAuthorized Req" })

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshtoken")
        if (!user) return res.status(401).json({ "MSG": "Invaild Access Tokens" })

        req.user = user;
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "MSG": "SOME SERVER ISSUES" })
    }
}