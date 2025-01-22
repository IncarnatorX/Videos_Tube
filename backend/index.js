import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}.`))
);
