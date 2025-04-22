import mongoose, { Schema } from "mongoose"

const recruiterSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true,
    },
    companyLogo: { 
        type: String 
    }, // Logo ka URL ya path store karne ke liye
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