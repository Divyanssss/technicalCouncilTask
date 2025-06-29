import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/noticeboard';
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } 
  catch (error) {
    console.log("MongoDB connection error:", error);
  }
};