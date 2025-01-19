/*
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const router = Router();
const prisma = new PrismaClient();

router.post('/shorten', async (req, res) => {
    const { originalUrl, userId } = req.body;

    try {
        const shortUrl = nanoid(8);
        const url = await prisma.url.create({
            data: { originalUrl, shortUrl, userId },
        });

        res.status(201).json({ success: true, url });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await prisma.url.findUnique({ where: { shortUrl } });
        if (!url) return res.status(404).json({ success: false, message: 'URL not found' });

        await prisma.url.update({
            where: { id: url.id },
            data: { clicks: { increment: 1 } },
        });

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.get('/analytics/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const urls = await prisma.url.findMany({ where: { userId: parseInt(userId) } });
        const analytics = urls.map((url) => ({
            originalUrl: url.originalUrl,
            shortUrl: url.shortUrl,
            clicks: url.clicks,
        }));

        res.status(200).json({ success: true, analytics });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default router;


*/