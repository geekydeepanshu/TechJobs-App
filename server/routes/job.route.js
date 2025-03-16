import express from "express"
import { authUser } from "../middleware/user.js";
import { deleteJob, getAllJobs, postJob, updateJob } from "../controllers/job.controller.js";
import { JobValidation } from "../Validation/jobValidater.js";
import { handleValidationError } from "../middleware/validate.js";

const Jobrouter = express.Router();

Jobrouter.post("/postjob",JobValidation,handleValidationError,authUser,postJob);
Jobrouter.get("/getalljobs",authUser,getAllJobs);
Jobrouter.put("/update/:id",authUser,updateJob);
Jobrouter.delete("/delete/:id",authUser,deleteJob);


export { Jobrouter } 