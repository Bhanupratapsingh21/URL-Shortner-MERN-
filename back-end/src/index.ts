import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import prisma from './utils/prishmaconnection';
import router from './Routes/auth';
import { errorHandler } from './Middleware/errorhandlers';
import urlrouter from "./Routes/url"
dotenv.config();

const app = express();

// CORS configuration
const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'https://url-shortner-mern.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Trust proxy settings (placing it before middleware)
app.set('trust proxy', true);

// Middleware setup
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('combined'));

app.use("/user", router);
app.use("/url", urlrouter);

// Error handling middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Database connection and server startup
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");
        
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();

export default app;