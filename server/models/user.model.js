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
        enum:['student','recruiter'],
    },
    profile: {
        bio: {type:String},
        skills:[{type:String}],
        resume:{type:String}, //Url to resume file
        company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},
    }


},{timestamps: true})

export const jobUser = mongoose.model("jobUser",UserSchema);