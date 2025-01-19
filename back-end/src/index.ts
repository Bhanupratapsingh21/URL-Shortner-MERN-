import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import prisma from './utills/prishmaconnection';
import { signup } from './Controller/Auth';
import router from './routes/auth';

dotenv.config();

const app = express();


const corsOptions: CorsOptions = {
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
app.post("signup",router)


const PORT = process.env.PORT || 5000;

// Database connection
const startServer = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected successfully");

        // Start server only after the database connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running at port : ${PORT}`);
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
app.get('/', (req, res) => {
    res.send('Welcome to the URL Shortener App!');
});
