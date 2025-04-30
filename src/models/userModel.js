//user model  

import mongoose from "mongoose";

//creating a user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,  
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,      
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    address:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    },
    isVerified:{
        type:Boolean,
        default:false,
    },

},{timestamps:true});

//exporting the user model
export default mongoose.model("User",userSchema);