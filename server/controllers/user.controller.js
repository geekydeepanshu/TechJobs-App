import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jobUser } from "../models/user.model.js";

// sign new user
export const SignUp = async (req, res) => {

    try {

        const { firstname, lastname, email, password } = req.body;

        // Check if user already exists
        const user = await jobUser.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash the password 
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user in the database
        await jobUser.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });

        return res.status(201).json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
// Login api
export const Login = async (req, res) => {
    try {
        const { email, password} = req.body;

        // Find user by email
        const user = await jobUser.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ success: false, message: "Email or password are wrong" });
        }

        // Compare the provided password with stored hash
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Email or password are wrong" });
        }

        const tokenData = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn: '1d'});

        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpsOnly:true, sameSite:"strict"}).json({
            success:true,
            message:`Welcome Back ${user.firstname}`,
            user
         })
      

    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};
// LogOut api 
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token","",{maxage:0}).json({
            success: true,
            message: "Successfully logged out."
        });
        
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};


