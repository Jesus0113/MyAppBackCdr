import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true
        
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    }
},
{ timestamps: true}
);

export const ticketModel = mongoose.model('Tickets', ticketSchema);