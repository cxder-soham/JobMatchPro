// app/api/auth/logout/route.js

import { cookies } from 'next/headers';

export async function POST() {
    const cookieStore = cookies();
    
    // Clear the auth cookie
    cookieStore.delete('auth-token');

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), {
        status: 200
    });
}