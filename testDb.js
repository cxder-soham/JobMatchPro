// testDb.js
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://spandan:spandan@clusterresumematcher.xcko1.mongodb.net/resume_matcher';

async function testConnection() {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection successful!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

testConnection();
