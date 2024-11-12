// models/Application.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const ApplicationSchema = new Schema(
    {
        job: { type: Schema.Types.ObjectId, ref: 'JobPosting', required: true },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        resume: { type: String, required: true }, // Path to the uploaded resume file
        coverLetter: { type: String },
        appliedAt: { type: Date, default: Date.now },
        // Additional fields as needed
    },
    { timestamps: true }
);

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
