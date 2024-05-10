import express from "express"
import urlRoute from "./Routes/url.js"
import dotenv from "dotenv"
import ConnectDb from "./utills/connect.js";


dotenv.config({
    path : "./.env"
})

const app = express();
const port = 4000;

ConnectDb()
.then(()=>{
    app.listen(port , ()=>{
        console.log(`Server Is Running At Port : ${port}`);
    })
    app.use(express.json())
    app.use("/" , urlRoute)

})
.catch(
    (err)=>{
        console.log("moogoDb connenation failed !! ::" , err )
})

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