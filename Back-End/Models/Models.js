import mongoose from "mongoose"

const urlSchema = new mongoose.Schema({
    shortId:{
        type: String ,
        required : true ,
        unique: true ,
    },
    redirectURL:{
        type : String,
        required : true,
    },
    visitHistory:[{
        timestamp: {
            type : String
        },
        "ip-addreas":{
            type: String
        },
        "Device-Info":{
            type: String
        },
        "Time-IND":{
            type : String
        }
    }],
    createdBy : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
},{
    timestamps : true
});

const url = mongoose.model("url", urlSchema)

export default url