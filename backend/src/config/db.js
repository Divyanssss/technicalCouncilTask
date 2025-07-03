import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://divyansh:OMuve5kjYYxvh7kW@cluster0.6iiar0g.mongodb.net/noticeboard?retryWrites=true&w=majority&appName=Cluster0';
    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } 
  catch (error) {
    console.log("MongoDB connection error:", error);
  }
};