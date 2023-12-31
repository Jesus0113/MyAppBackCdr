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
        type: String,
        unique: true 
    },
    stock: {
        type: Number,
        default: 0 
    },
    category: {
        type: String
    },
    owner: {
        type: String,
        default: 'admin'
    }
})

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model('Products', productsSchema)