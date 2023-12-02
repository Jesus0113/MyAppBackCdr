import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    status: {
        type: String
    },
    code: {
        type: Number,
        unique: true 
    },
    stock: {
        type: Number,
        default: 0 
    },
    category: {
        type: String
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema)