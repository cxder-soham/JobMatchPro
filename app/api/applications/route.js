import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Application from '@/models/Application';

// POST method for submitting an application
export async function POST(req) {
    try {
        await dbConnect();

        // Get the form data using the FormData API
        const formData = await req.formData();

        // Extract file and other form fields
        const file = formData.get('resume');
        const fullName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const coverLetter = formData.get('coverLetter');
        const jobId = formData.get('jobId');

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'Resume file is required.' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        // Create new application
        const newApplication = new Application({
            applicantName: fullName,
            applicantEmail: email,
            applicantPhone: phone,
            jobId,
            coverLetter,
            resume: {
                data: buffer,
                contentType: file.type,
                filename: file.name,
            },
        });

        await newApplication.save();
        return NextResponse.json({ success: true }, { status: 201 });

    } catch (error) {
        console.error('Error saving application:', error);
        return NextResponse.json(
            { success: false, error: 'Error saving application' },
            { status: 500 }
        );
    }
}

// GET method for fetching applications based on jobId
export async function GET(req) {
    try {
        await dbConnect();

        const url = new URL(req.url);
        const jobId = url.searchParams.get('jobId');

        if (!jobId) {
            return NextResponse.json(
                { success: false, error: 'Job ID is required.' },
                { status: 400 }
            );
        }

        const applications = await Application.find({ jobId });

        return NextResponse.json({ success: true, data: applications }, { status: 200 });
    } catch (error) {
        console.error('Error fetching applications:', error);
        return NextResponse.json(
            { success: false, error: 'Error fetching applications.' },
            { status: 500 }
        );
    }
}

// To handle large file uploads, add this config
export const config = {
    api: {
        bodyParser: false,
    },
};
