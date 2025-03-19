import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import nodemailer from "nodemailer"

// register new user
export const SignUp = async (req, res) => {

    try {

        const { firstname, lastname, email, password, role } = req.body;

        // Check if user already exists 
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password 
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            role
        });

        return res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
// Login user
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

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

        return res.status(200).json({
            success: true,
            message: `Welcome Back ${user.firstname}`,
            user: userWithoutPassword,
            token
        })


    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
// LogOut user 
export const logout = async (req, res) => {
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
