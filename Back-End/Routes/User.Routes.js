import express from "express"
import { verifyjwt } from "../Middlewares/auth.middleware.js";
import { 
    handleUserLogin,
    handleUserSignUp,
    refreshAccessToken,
    LogoutUser,

} from "../Controllers/Auth.Controller.js"


const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/refreshtoken", refreshAccessToken);
router.get("/logout",verifyjwt,LogoutUser)

export default router