import express from "express";
import {
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
} from "../Controllers/url.js";
import {verifyjwt} from "../Middlewares/auth.middleware.js"
import Validateauth from "../Middlewares/Validate.js";

const router = express.Router();

router.post("/createurl", Validateauth ,generateNewUrl);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", Validateauth ,handlegetanalytics);

export default router