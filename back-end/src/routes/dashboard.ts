import { Router } from 'express';
import {
    getLinkStats
} from "../controller/Url.controllers";
import { getAllLinks } from '../controller/dashboardcontroller';
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

router.get("/getLinkStats/:shortId", async (req, res, next) => {
    try {
        await getLinkStats(req, res, next);
    } catch (error) {
        next(error);
    }
});


export default router;