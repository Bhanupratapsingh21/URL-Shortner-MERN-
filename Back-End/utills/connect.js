import mongoose from "mongoose";


async function ConnectDb(){
    try {
        await mongoose.connect(`${process.env.MONGODB_CONNECTIONSTRING}/${process.env.DB_NAME}`)
        console.log("Data-Base Connected")
    } catch (error) {
        console.log("Error in DB Connection", error)
        process.exit(1)     
    }
}

export default ConnectDb