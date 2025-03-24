import express from "express"
import { ForgetPassword, Login, logout, ResetPassword, SignUp } from "../controllers/user.controller.js";
import { authUser } from "../middleware/user.js";
import { loginValidation, SignUpValidation } from "../Validation/userValidater.js";
import { handleValidationError } from "../middleware/validate.js";

const router = express.Router();

router.post("/signup",SignUpValidation,handleValidationError,SignUp);
router.post("/login",loginValidation,handleValidationError,Login);
router.post("/logout",authUser,logout);
router.post("/forget-password",ForgetPassword)
router.post("/reset-password/:token",ResetPassword)

export { router }