import express from "express";
import urlRoute from "./Routes/url.js";
import dotenv from "dotenv";
import ConnectDb from "./utills/connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./Routes/User.Routes.js";
import { handleRedirect } from "./Controllers/url.js"

dotenv.config({
    path: "./.env"
});

const app = express();
const port = 4000;

const corsOptions = {
    origin: '*'
};

// added cors (cros origin resource Shareing )
app.use(cors(corsOptions));

// added Some Middelwares 
app.use(express.json());
app.use(cookieParser());

ConnectDb()
    .then(() => {
        // Start server
        app.listen(port, () => {
            console.log(`Server Is Running At Port : ${port}`);
        });
        // allow to capture the ip or trust proxy
        app.set('trust proxy', true);
        // Define routes
        app.get("/home", (req, res) => {
            return res.status(201).json({ "MSG": "HOME" })
        })
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