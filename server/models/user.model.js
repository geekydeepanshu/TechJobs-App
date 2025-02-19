import mongoose, { Schema } from "mongoose"

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

},{timestamps: true})

export const jobUser = mongoose.model("jobUser",UserSchema);