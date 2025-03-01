import mongoose, { Schema } from "mongoose"

const recruiterSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
        unique: true
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
        default: 'recruiter',
        required:true
    },

},{timestamps: true})

export const recruiter = mongoose.model("recruiter",recruiterSchema);