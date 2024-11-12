// pages/api/applications/index.js

import dbConnect from '../../../lib/dbConnect';
import Application from '../../../models/Application';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, use formidable
    },
};

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        const form = new formidable.IncomingForm();
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        // Ensure the upload directory exists
        fs.mkdirSync(uploadDir, { recursive: true });

        form.uploadDir = uploadDir;
        form.keepExtensions = true;

        form.parse(req, async (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                return res.status(500).json({ success: false, error: 'Error parsing form data' });
            }

            try {
                const { jobId, fullName, email, phone, coverLetter } = fields;
                const resumeFile = files.resume;

                // Move the uploaded file to the desired location
                const newFileName = `${Date.now()}-${resumeFile.originalFilename}`;
                const newPath = path.join(uploadDir, newFileName);
                fs.renameSync(resumeFile.filepath, newPath);

                // Create a new application
                const application = await Application.create({
                    job: jobId,
                    fullName,
                    email,
                    phone,
                    coverLetter,
                    resume: `/uploads/${newFileName}`, // Store the relative path
                });

                res.status(201).json({ success: true, data: application });
            } catch (error) {
                console.error('Error saving application:', error);
                res.status(500).json({ success: false, error: error.message });
            }
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
