import express from "express"
import { verifyjwt } from "../Middlewares/auth.middleware.js";
import { 
    handleUserLogin,
    handleUserSignUp,
    refreshAccessToken,
    LogoutUser,

} from "../Controllers/Auth.Controller.js"


const router = express.Router();

router.post("/sign-up", handleUserSignUp);
router.post("/login", handleUserLogin);
router.post("/refreshtoken", refreshAccessToken);
router.post("/logout",verifyjwt,LogoutUser)

export default router