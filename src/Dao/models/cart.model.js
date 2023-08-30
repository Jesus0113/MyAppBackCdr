import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {type:mongoose.Schema.Types.ObjectId, ref: 'Products'},
            quantify:Number
        }
    ]

})


export const cartModel = mongoose.model('Cart', cartSchema);