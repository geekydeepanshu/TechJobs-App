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
    role: {
        type: String,
        enum: ['jobseeker', 'recruiter'], // Define possible roles
        default: 'jobseeker', // Default role is jobseeker
        required:true
    },

},{timestamps: true})

export const User = mongoose.model("User",UserSchema);