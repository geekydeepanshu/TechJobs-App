import { Job } from "../models/job.model.js";

// create a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, category, salary, location, level } = req.body; 
        const userId = req.id;  

        // Create the job
        const job = await Job.create({
            title,
            description,
            category,
            salary: Number(salary),
            location,
            level,
            createdBy: userId, 
        });

        return res.status(201).json({
            message: "New job created successfully",
            success: true,
            job,
        });

    } catch (error) {
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
        return res.status(500).json({
            success: false,
            message: "Internal Server Error while fetching jobs",
        });
    }
};
// Update a job by its ID
export const updateJob = async (req, res) => {
    const jobId = req.params.id;  // Get job ID from URL params
    const { title, description, category, salary, location, level } = req.body;

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
                category,
                salary: Number(salary), 
                location, 
                level
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