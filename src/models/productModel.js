//product model
import mongoose from "mongoose";

//creating a product schema
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,  
    },
    slug:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
    },
    description:{
        type:String,  
     },
     price:{
        type:Number,
        required:true,
        
     },
     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
     },
     quantity:{
        type:Number,
        required:true,
     },
    images:{
        type:String,           
    },

    color:{
        type:String,         
    },
    brand:{
        type:String,          
    },
    stock:{
        type:Number,
        default:0,
    },
         
    
},{timestamps:true});

//exporting the product model
export default mongoose.model("Product",productSchema);