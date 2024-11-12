// models/User.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String },
        email: {
            type: String,
            unique: true,
            sparse: true, // Allow null emails if you don't have authentication yet
        },
        role: { type: String, enum: ['applicant', 'hr'], default: 'applicant' },
        // Additional fields as needed
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
