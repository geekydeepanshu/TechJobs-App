import express from "express"
import { authUser } from "../middleware/user.js";
import { recruiterSignUpValidation,recruiterloginValidation } from "../Validation/recruiterValidater.js";
import { handleValidationError } from "../middleware/validate.js";
import { getJobsByRecruiter, recruiterLogin, recruiterlogout, recruiterSignUp } from "../controllers/recruiter.controller.js";

const recruiter = express.Router();

recruiter.post("/signup",recruiterSignUpValidation,handleValidationError,recruiterSignUp);
recruiter.post("/login",recruiterloginValidation,handleValidationError,recruiterLogin);
recruiter.post("/logout",authUser,recruiterlogout);
recruiter.get("/:recruiter_id/jobCount",authUser,getJobsByRecruiter);

export { recruiter }