import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    fromGithub: {
        type:Boolean,
        default:false
    },
    role:{
        type: String,
        enum: ['admin', 'client', 'premium' ],
        default:'client'

    }
});

export const usersModel = mongoose.model('Users', usersSchema);