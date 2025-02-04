import { nanoid } from "nanoid";
/*
import url from "../Models/Models.js";
import mongoose from 'mongoose'

async function generateNewUrl(req, res) {
    const shortID = nanoid(8);
    const body = req.body;
    try {
        if (!body.url) {
            return res
                .status(400)
                .json({ "msg": "URL IS REQUIRED" })
        }

        await url.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        return res.status(201).json({ shorturl: shortID })
    } catch (error) {
        console.log("Error in genrate url :", error)
        return res.status(500), json({ MSG: "SOME THING WANT WORNG FROM SERVER" })
    }
}

async function handleRedirect(req, res) {
    try {
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
    } catch (error) {
        console.log("Error in Redirects :", error)
        return res.status(500), json({ MSG: "SOME THING WANT WRONG FROM SERVER" })
    }
}
async function handlegetanalytics(req, res) {
    const ObjectId = mongoose.Types.ObjectId;
    const userid = req.user._id;
    const Shortid = req.params.shortId;

    try {
        const result = await url.findOne({
            shortId: String(Shortid)
        }).select("-_id -shortId");

        if (!result) {
            return res.status(404).json({ MSG: "URL not found" });
        }

        // Log values for debugging
        //  console.log('Result createdBy:', result.createdBy);
        // console.log('User ID:', userid);

        // Convert `createdBy` and `userid` to ObjectId for comparison
        const createdByObjectId = new ObjectId(result.createdBy); // Use `ObjectId()` directly
        const userIdObjectId = new ObjectId(userid); // Use `ObjectId()` directly

        // Log ObjectId values for debugging
        // console.log('CreatedBy ObjectId:', createdByObjectId);
        // console.log('UserId ObjectId:', userIdObjectId);

        if (!createdByObjectId.equals(userIdObjectId)) {
            return res.status(401).json({ MSG: "This URL is not created by you" });
        }

        return res.json({
            result
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ MSG: 'Internal Server Error' });
    }
}

export {
    generateNewUrl,
    handleRedirect,
    handlegetanalytics
}

*/