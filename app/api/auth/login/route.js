// app/api/auth/login/route.js

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import getUserModel from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        await dbConnect();
        const User = await getUserModel();
        const { email, password } = await request.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: 'Email and password are required' }),
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return new Response(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Prepare the user response here BEFORE sending it
        const userResponse = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        // Set token in the cookie
        const response = NextResponse.json(userResponse, { status: 200 });
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return new Response(
            JSON.stringify({ message: 'Internal server error' }),
            { status: 500 }
        );
    }
}
