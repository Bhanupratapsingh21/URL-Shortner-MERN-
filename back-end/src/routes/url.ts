import { Router } from 'express';
import {
    createLink,
    createRedirect,
    redirectOptimized,
    getLinkStats
} from "../Controller/Url.controllers";

const router = Router();

router.get("/redirect/:shortId", async (req, res, next) => {
    try {
        await redirectOptimized(req, res, next);
    } catch (error) {
        next(error);
    }
});


import { authMiddleware } from '../Middleware/auth.Middleware';

router.use(authMiddleware);

router.post("/createUrl", async (req, res, next) => {
    try {
        await createLink(req, res,next);
    } catch (error) {
        next(error);
    }
});

router.post("/createRedirect", async (req, res, next) => {
    try {
        await createRedirect(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get("/getLinkStats/:shortId", async (req, res, next) => {
    try {
        await getLinkStats(req, res, next);
    } catch (error) {
        next(error);
    }
});


export default router;