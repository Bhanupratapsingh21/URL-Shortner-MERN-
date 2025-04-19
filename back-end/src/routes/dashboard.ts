import { Router } from 'express';

import {
    getAllLinks,
    getAllRedirects,
    getLinkStats,
    getChartsdataforLink,
    getAllLinksAnalytics
} from '../controller/dashboardcontroller';
import { authMiddleware } from '../middleware/auth.Middleware';


const router = Router();

router.use(authMiddleware);


router.get("/getallLinks", async (req, res, next) => {
    try {
        await getAllLinks(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get("/getLinkRedirects/:shortId", async (req, res, next) => {
    try {
        await getAllRedirects(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get("/getLinkchartdata/:shortId", async (req, res, next) => {
    try {
        await getChartsdataforLink(req, res, next);
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

router.get('/chart-main-data', async (req, res, next) => {
    try {
        await getAllLinksAnalytics(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default router;