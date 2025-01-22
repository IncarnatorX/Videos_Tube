import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}.`))
);
