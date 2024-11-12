import dbConnect from '@/lib/dbConnect';

export async function GET() {
    try {
        await dbConnect();
        return new Response(JSON.stringify({ success: true, message: 'Database connection successful!' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: 'Database connection failed!', error: error.message }), { status: 500 });
    }
}
