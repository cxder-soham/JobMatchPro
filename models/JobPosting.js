const mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: [String], required: true },
    responsibilities: { type: [String], required: true },
    postedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);
