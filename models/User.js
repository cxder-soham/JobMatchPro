import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    role: {
        type: String,
        enum: ['applicant', 'hr'],
        required: true,
    }
}, { timestamps: true });

async function getUserModel() {
    // Ensure database connection is established before defining the model
    await dbConnect();

    // Check if the model is already defined to prevent redefining it
    return mongoose.models.User || mongoose.model('User', UserSchema);
}

export default getUserModel;
