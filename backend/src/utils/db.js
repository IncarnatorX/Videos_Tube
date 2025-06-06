import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error Connecting to MongoDB: ", error.message);
  }
};

export default connectDB;
