import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import videoRouter from "./routes/video_route.js";
import userRouter from "./routes/user_route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(videoRouter);
app.use(userRouter);
app.use(cookieParser());

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}.`))
);
