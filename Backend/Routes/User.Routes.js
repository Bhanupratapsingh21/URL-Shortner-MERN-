import express from "express"
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import {
    handleUserLogin,
    handleUserSignUp,
    refreshAccessToken,
    LogoutUser,

} from "../Controllers/Auth.Controller.js"


const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/refreshtoken", refreshAccessToken);
router.get("/logout", verifyJwt, LogoutUser)

export default router