import express from "express";
import { 
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
 } from "../Controllers/url.js";
import url from "../Models/Models.js"

const router = express.Router();

router.post("/url", generateNewUrl);
router.get("/:shortId",handleRedirect);
router.get("/analytics/:shortId",handlegetanalytics);

export default router