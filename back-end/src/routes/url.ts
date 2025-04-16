import { Router } from 'express';
import {
    createLink,
    createRedirect,
    deleteLink,
    deleteRedirect,
    editRedirect,
    getLink,
    redirectOptimized,
} from "../controller/Url.controllers";

const router = Router();

router.get("/redirect/:shortId", async (req, res, next) => {
    try {
        await redirectOptimized(req, res, next);
    } catch (error) {
        next(error);
    }
});


import { authMiddleware } from '../middleware/auth.Middleware';
import prisma from '../utils/prishmaconnection';

router.use(authMiddleware);

router.post("/createUrl", async (req, res, next) => {
    try {
        await createLink(req, res, next);
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


router.get('/links', async (_req, res) => {
    try {
        const users = await prisma.link.findMany(); // Fetch all users from the database
        res.json(users); // Return the list of users as a JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.patch('/editRedirect/', async (req, res, next) => {
    try {
        await editRedirect(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.delete('/deleteLink/', async (req, res, next) => {
    try {
        await deleteLink(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.delete('/deleteredirect/', async (req, res, next) => {
    try {
        await deleteRedirect(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/getLink', getLink);

export default router;