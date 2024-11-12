// app/api/auth/login/route.js

import dbConnect from '@/lib/dbConnect';
import getUserModel from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        await dbConnect();
        const User = await getUserModel();  // Ensure User model is ready
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: 'Email and password are required' }), 
                { status: 400 }
            );
        }

        // Find user by email
        const user = await User.findOne({ email });
        
        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }), 
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }), 
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set HTTP-only cookie
        const cookieStore = cookies();
        cookieStore.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 24 hours
            path: '/',
        });

        // Return user data (excluding sensitive information)
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        return Response.json(userResponse, { status: 200 });

    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }), 
            { status: 500 }
        );
    }
}

// Middleware to verify JWT token
export async function validateToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
}

// Helper function to get current user from token
export async function getCurrentUser(request) {
    const cookieStore = cookies();
    const token = cookieStore.get('auth-token');

    if (!token) {
        return null;
    }

    const decoded = await validateToken(token.value);
    if (!decoded) {
        return null;
    }

    try {
        await dbConnect();
        const User = await getUserModel();  // Ensure User model is ready
        const user = await User.findById(decoded.userId).select('-password');
        return user;
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}
