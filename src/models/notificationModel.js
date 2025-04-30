//notification model

import mongoose from "mongoose";

//creating a notification schema

const notificationSchema = new mongoose.Schema({
    use:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },
    message:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["order","product","review","cart"],
        required:true,
    },
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart",
    },

    isRead:{
        type:Boolean,
        default:false,
    },
},{timestamps:true},
);

//exporting the notification model
export default mongoose.model("Notification",notificationSchema);