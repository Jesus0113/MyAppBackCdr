import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
       required: true,
        unique: true 
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true

    },
    code: {
        type: Number,
        required: true,
        unique: true 
    },
    stock: {
        type: Number,
        required: true,
        default: 0 
    },
    category: {
        type: String,
        required: true
    }

})

export const productsModel = mongoose.model('Products', productsSchema)