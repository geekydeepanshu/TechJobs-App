import bcrypt, { hash } from "bcrypt";
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
// Forgot password
export const ForgetPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Please provide your email address." });
        }

        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(400).json({ success: false, message: "No account found with this email address." });
        }

        // Generate token with 1-hour expiry
        const token = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Create a transporter for sending the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure:true,
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASSWORD,
            }
        });

        const receiver = {
            from: "Techjobs@gmail.com",
            to: email,
            subject: "Password Reset Request",
            text: `We received a request to reset your password. To proceed, please click the link below to reset your password:\n\n${process.env.CLINT_URL}/reset-password?token=${token}\n\nIf you did not request a password reset, please ignore this email.`
        };

        // Send the email
        await transporter.sendMail(receiver);
        
        return res.status(200).json({ success: true, message: "A password reset link has been sent to your email. Please check your inbox." });

    } catch (error) {
        console.error("Forgot Password Error:", error);
        return res.status(500).json({ success: false, message: "An error occurred while processing your request. Please try again later." });
    }
};
// Reset Password
export const ResetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ success: false, message: "Please provide a new password." });
        }

        // Verify the token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            return res.status(400).json({ success: false, message: "The reset link is invalid or has expired." });
        }

        const user = await User.findOne({ email: decoded.email });

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found with this email." });
        }

        // Hash the new password before saving
        const newHashedPassword = await bcrypt.hash(password, 10);
        user.password = newHashedPassword;

        // Save the updated password
        await user.save();

        // Return success message
        return res.status(200).json({ success: true, message: "Your password has been successfully reset. You can now log in with your new password." });

    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ success: false, message: "An error occurred while resetting your password. Please try again later." });
    }
};

