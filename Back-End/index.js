import express from "express";
import urlRoute from "./Routes/url.js";
import dotenv from "dotenv";
import ConnectDb from "./utills/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/User.Routes.js";
import { handleRedirect } from "./Controllers/url.js";

dotenv.config({
    path: "./.env"
});

const app = express();
const port = 4000;

const corsOptions = {
    origin: ['http://localhost:5173', 'https://url-shortner-mern.vercel.app'], // Add other allowed origins as needed
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    exposedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

// Enable pre-flight across-the-board
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(cookieParser());

ConnectDb()
    .then(() => {
        // Start server
        app.listen(port, () => {
            console.log(`Server Is Running At Port : ${port}`);
        });

        // Allow to capture the IP or trust proxy
        app.set('trust proxy', true);

        // Define routes
        app.get("/home", (req, res) => {
            return res.status(201).json({ "MSG": "HOME" });
        });

        app.get("/:shortId", handleRedirect);
        app.use("/url", urlRoute);
        app.use("/users", userRoute);
    })
    .catch(err => {
        console.log("MongoDB connection failed!!", err);
    });

/*

.then(()=>{

    app.on("error",(error)=>{
        console.log("error not able to listin",error);
    })
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`Server iS Running At Port ${process.env.PORT}`)
    })
})
.catch(
    (err)=>{
        console.log("moogoDb connenation failed !! ::" , err )
})
*/