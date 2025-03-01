import express from "express"
import { authUser } from "../middleware/user.js";
import { recruiterSignUpValidation,recruiterloginValidation } from "../Validation/recruiterValidater.js";
import { handleValidationError } from "../middleware/validate.js";
import { recruiterLogin, recruiterlogout, recruiterSignUp } from "../controllers/recruiter.controller.js";

const recruiter = express.Router();

recruiter.post("/Recsignup",recruiterSignUpValidation,handleValidationError,recruiterSignUp);
recruiter.post("/Reclogin",recruiterloginValidation,handleValidationError,recruiterLogin);
recruiter.post("/Reclogout",authUser,recruiterlogout);

export { recruiter }