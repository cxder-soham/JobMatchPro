// app/api/auth/register/route.js

import dbConnect from '@/lib/dbConnect';
import getUserModel from '@/app/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    // Ensure database connection
    await dbConnect();

    // Get the User model dynamically
    const User = await getUserModel();

    // Extract user input from request body
    const { username, email, password, role } = await request.json();

    // Validate input fields
    if (!username || !email || !password || !role) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }), 
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User with this email or username already exists' }), 
        { status: 409 }
      );
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Remove password from the response object for security reasons
    const userWithoutPassword = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    // Return the user response (without password)
    return new Response(
      JSON.stringify(userWithoutPassword), 
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return new Response(
      JSON.stringify({ message: 'Error creating user' }), 
      { status: 500 }
    );
  }
}
