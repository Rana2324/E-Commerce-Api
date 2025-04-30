//catagory model

import mongoose from "mongoose";

//category schema
const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,

    },
    image:{
        type:String,      
    },
    description:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true,
    },

},{
    timestamps:true,
});

//exporting the model
export default mongoose.model("Category",categorySchema);