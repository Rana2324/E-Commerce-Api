//token model
import mongoose from "mongoose";

//creating a token schema

const tokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    token:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:3600, // 1 hour in seconds
    },
})

//exporting the token model
export default mongoose.model("Token",tokenSchema);