import mongoose, { Schema } from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type: [String], // Changed to an array of strings for multiple requirements
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    jobLevel: {
      type: String, //  (e.g., "Entry", "Mid", "Senior")
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model
    },
  },
  { timestamps: true } // Automatically creates 'createdAt' and 'updatedAt' fields
);

// Export the model
export const Job = mongoose.model("Job", JobSchema);
