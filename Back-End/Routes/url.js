import express from "express";
import {
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
} from "../Controllers/url.js";
import {verifyjwt} from "../Middlewares/auth.middleware.js"

const router = express.Router();

router.post("/createurl", verifyjwt ,generateNewUrl);
router.get("/:shortId", handleRedirect);
router.get("/analytics/:shortId", verifyjwt ,handlegetanalytics);

export default router