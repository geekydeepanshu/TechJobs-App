import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { recruiter } from "../models/recruiter.model.js";
import mongoose from "mongoose";
import { Job } from "../models/job.model.js";

// register recruiter
export const recruiterSignUp = async (req, res) => {

    try {

        const { companyName, email, password, role } = req.body;
        const companyLogo = req.file ? `/uploads/${req.file.filename}` : null; // Sirf path save karo

        // Check if user already exists 
        const user = await recruiter.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password 
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        await recruiter.create({
            companyName,
            email,
            password: hashPassword,
            role,
            companyLogo
        });

        return res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
// Login recruiter
export const recruiterLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await recruiter.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "Email or password are wrong" });
        }

        // Compare the provided password with stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Email or password are wrong" });
        }

        const tokenData = {
            userId: user._id
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Remove the password 
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.status(200).json({    //.cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:"strict"})  
            success: true,
            message: `Welcome Back ${user.companyName}`,
            user: userWithoutPassword,
            token
        })


    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
// LogOut recruiter
export const recruiterlogout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxage: 0 }).json({
            success: true,
            message: "Successfully logged out."
        });

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
// Get all jobs by a recruiter
export const getJobsByRecruiter = async (req, res) => {
    const recruiterId = req.params.recruiter_id; // Get recruiter ID from URL params

    try {
        // Check if recruiterId is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
            return res.status(400).json({
                success: false,
                message: "The provided recruiter ID is invalid. Please ensure it is in the correct format."
            });
        }

        // Recruiter se company details fetch karna
        const recruiterData = await recruiter.findById(recruiterId).select('companyName companyLogo');
        if (!recruiterData) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found."
            });
        }

        // Jobs fetch karna
        const jobs = await Job.find({ recruiter_id: recruiterId });
        if (!jobs || jobs.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No jobs found for this recruiter.",
                jobs: []
            });
        }

        // Jobs ka array banaye with company details
        const jobsList = jobs.map(job => ({
            company: {
                companyName: recruiterData.companyName,
                companyLogo: recruiterData.companyLogo
            },
            id: job._id,
            title: job.title,
            description: job.description,
            recruiter_id: job.recruiter_id,
        }));

        // Response with jobs object
        return res.status(200).json({
            success: true,
            message: `Successfully retrieved ${jobs.length} job(s) created by the recruiter.`,
            jobs: jobsList
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred while retrieving the jobs. Please try again later."
        });
    }
};