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
    category: {
      type: String, 
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
    level: {
      type: String,
      required: true,
    },
    isVisible: { 
      type: Boolean, 
      default: true
     }, // New field: true = show, false = hide
    recruiter_id: { 
       type: mongoose.Schema.Types.ObjectId,
       ref: 'recruiter', 
       required: true
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
