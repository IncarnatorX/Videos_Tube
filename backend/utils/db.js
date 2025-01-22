import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error(error.message);
  }
};

export default connectDB;
