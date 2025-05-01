//OTP model 

import mongoose from "mongoose";

//creating a OTP schema

const otpSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:600, // 10 minutes in seconds
    },
})

//exporting the OTP model
export default mongoose.model("OTP",otpSchema);