import { Job } from "../models/job.model.js";

// create a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, jobLevel } = req.body;
        const userId = req.id;  // Ensure req.id is set by your authUser middleware

        // Check for missing fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !jobLevel) {
            return res.status(400).json({ success: false, message: "Something is missing..." });
        }

        // Validate salary to be a number
        if (isNaN(salary) || salary <= 0) {
            return res.status(400).json({ success: false, message: "Salary must be a valid positive number." });
        }

        // Create the job
        const job = await Job.create({
            title,
            description,
            requirements,
            salary: Number(salary),
            location,
            jobType,
            jobLevel,
            createdBy: userId,  // Ensure userId is set correctly
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job,
        });

    } catch (error) {
        console.error("Error creating job:", error);  // Improved logging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while creating job",
        });
    }
};

// get all jobs
export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();  // Fetch all jobs from the database
        return res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);  // Improved logging
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching jobs",
        });
    }
};

// Update a job by its ID
export const updateJob = async (req, res) => {
    const jobId = req.params.id;  // Get job ID from URL params
    const { title, description, requirements, salary, location, jobType, jobLevel } = req.body;

    try {
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // Update the job with new data
        const updatedJob = await Job.findByIdAndUpdate(
            jobId, 
            { 
                title, 
                description, 
                requirements, 
                salary: Number(salary), 
                location, 
                jobType, 
                jobLevel
            },
            { new: true }  // Return the updated job object
        );

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            updatedJob,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update the job",
        });
  }
}

// Delete a job by its ID
export const deleteJob = async (req, res) => {
    const jobId = req.params.id;  // Get job ID from URL params

    try {
        // Check if job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete the job",
        });
    }
};