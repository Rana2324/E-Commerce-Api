//cart model 

import mongoose from"mongoose";

//creating a cart schema
const cartSchema = new mongoose.Schema({
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
    ]
})

//exporting the cart model
export default mongoose.model("Cart",cartSchema);