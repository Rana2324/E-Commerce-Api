import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed:', error.message);
  }
};

export default connectDB;
