// app/api/test-connection/route.js

import dbConnect from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();
        return NextResponse.json({ message: 'Database connection successful!' }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: 'Database connection failed!', error: error.message },
            { status: 500 }
        );
      }
}