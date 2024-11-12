import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import JobPosting from '@/models/JobPosting';

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();

        // Validation: Ensure all required fields are present
        const { title, department, location, salary, description, requirements, responsibilities } = body;
        if (!title || !department || !location || !salary || !description || !requirements || !responsibilities) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields. Please provide all necessary information.' },
                { status: 400 }
            );
        }

        console.log('Creating Job Posting:', body);

        // Automatically set the postedDate if not provided
        const jobPosting = new JobPosting({
            ...body,
            postedDate: body.postedDate || new Date(),
        });

        const savedJob = await jobPosting.save();
        console.log('Saved job posting:', savedJob);

        return NextResponse.json(
            { success: true, data: savedJob },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating job posting:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const jobPostings = await JobPosting.find({}).sort({ postedDate: -1 });

        console.log('Retrieved job postings:', jobPostings.length);

        return NextResponse.json(
            { success: true, data: jobPostings },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in GET /api/job-postings:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        await dbConnect();
        console.log('Attempting to delete all job postings');
        const deleteResult = await JobPosting.deleteMany({});
        console.log('Delete result:', deleteResult);

        return NextResponse.json(
            { success: true, message: 'All job postings deleted', data: deleteResult },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in DELETE /api/job-postings:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
