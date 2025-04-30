//order model
import mongoose from "mongoose";

//creating a order schema
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
                default:1,
            }
            
        }
    ],
    shippingAddress:{
        type:String,
        required:true,
    },
    paymentMethod:{
        type:String,
        required:true,
    },
    paymentStatus:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending",
    },
    orderStatus:{
        type:String,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending",
    },
    totalAmount:{
        type:Number,
        required:true,
    },
    orderDate:{
        type:Date,
        default:Date.now,
    },
    deliveryDate:{
        type:Date,
    },
    trackingId:{
        type:String,
    },
    trackingUrl:{
        type:String,
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    isDelivered:{
        type:Boolean,
        default:false,
    },
    isCancelled:{
        type:Boolean,
        default:false,
    },
   

})

//exporting the order model
export default mongoose.model("Order",orderSchema);