import express from "express";
import urlRoute from "./Routes/url.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/User.Routes.js";
import { handleRedirect } from "./Controllers/url.js";
import prisma from './utils/prisma.js'; // Ensure the path is correct
import helmet from "helmet";
import morgan from "morgan";

dotenv.config({
    path: "./.env"
});

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
    origin: ['http://localhost:5173', 'https://url-shortner-mern.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // Adds security headers
app.use(morgan('combined')); // Logger

// Database connection
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");

        // Start server only after the database connection is successful
        app.listen(port, () => {
            console.log(`Server is running at port : ${port}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1); // Exit process with failure
    }
};

startServer();

// Allow to capture the IP or trust proxy
app.set('trust proxy', true);

// Define routes
app.get("/home", (req, res) => {
    return res.status(200).json({ message: "HOME" });
});

app.get("/:shortId", handleRedirect);
app.use("/url", urlRoute);
app.use("/users", userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("An error occurred:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
