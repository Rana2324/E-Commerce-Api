import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection options
const mongooseOptions = {
  autoIndex: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
};

/**
 * Connect to MongoDB database
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    // Try to get MongoDB URI from environment variables, or use a fallback for testing
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/e-commerce-api';

    console.log('Connecting to MongoDB...');
    // For testing purposes only - in production always use environment variables

    // Listen for connection events
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connection established successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });

    // Connect to MongoDB
    await mongoose.connect(mongoURI, mongooseOptions);

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    // Re-throw the error to be handled by the caller
    throw error;
  }
};

export default connectDB;
