const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.DB

if (!uri) {
    throw new Error('Database URI is not defined in environment variables')
}

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully')
    } catch (err) {
        console.error('MongoDB connection error:', err.message)
        process.exit(1)
    }
};


module.exports = connectDB
