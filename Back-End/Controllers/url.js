import { nanoid } from "nanoid";
import url from "../Models/Models.js";

async function generateNewUrl(req, res) {
    const shortID = nanoid(8);
    const body = req.body;
    if (!body.url) {
        return res
            .status(400)
            .json({ "msg": "URL IS REQUIRED" })
    }

    await url.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.status(201).json({ shorturl: shortID })
}

async function handleRedirect(req, res) {
    const Shortid = req.params.shortId;
    const ip = req.ip;
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const userAgent = req.headers['user-agent'];
    let deviceType = 'Unknown';
    if (/mobile/i.test(userAgent)) {
        deviceType = 'Mobile';
    } else if (/tablet/i.test(userAgent)) {
        deviceType = 'Tablet';
    } else if (/iPad/i.test(userAgent)) {
        deviceType = 'iPad';
    } else if (/iPhone/i.test(userAgent)) {
        deviceType = 'iPhone';
    } else if (/Android/i.test(userAgent)) {
        deviceType = 'Android';
    } else if (/Windows Phone/i.test(userAgent)) {
        deviceType = 'Windows Phone';
    } else if (/Macintosh/i.test(userAgent)) {
        deviceType = 'Desktop (Mac)';
    } else if (/Windows NT/i.test(userAgent)) {
        deviceType = 'Desktop (Windows)';
    } else if (/Linux/i.test(userAgent)) {
        deviceType = 'Desktop (Linux)';
    }
    const entry = await url.findOneAndUpdate(
        {
            shortId: String(Shortid)
        },
        {
            $push: {
                visitHistory: {
                    timestamp: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} :${date.getTime()}`,
                    "Time-IND": `${hours}:${minutes}:${seconds}`,
                    "ip-addreas": ip,
                    "Device-Info": deviceType,
                },
            }
        }
    )
    if (!entry) {
        return res.status(404).json({ 'BAD-REQ': "404 Not Found" })
    }

    res.status(302)
    res.redirect(entry.redirectURL)
}

async function handlegetanalytics(req, res) {
    const Shortid = req.params.shortId;
    const result = await url.findOne({
        shortId: String(Shortid)
    }).select(
        // kya kya nhi chahiye - sign k sath do yha
        "-_id -shortId"
    )
    return res.json(result)
}

export {
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
}
