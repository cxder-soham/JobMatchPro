import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    applicantName: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    jobId: { type: String, required: true },
    applicantPhone: { type: String },
    coverLetter: { type: String },
    resume: {
        data: Buffer, // Store the file buffer
        contentType: { type: String, required: true }, // File content type (e.g., "application/pdf")
        filename: { type: String, required: true }, // Original file name
    },
}, { timestamps: true });

export default mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
