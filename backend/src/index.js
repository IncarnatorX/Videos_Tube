import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import videoRouter from "./routes/video_route.js";
import userRouter from "./routes/user_route.js";
import cookieParser from "cookie-parser";
import otpRouter from "./routes/otp_route.js";
import likesDislikesRoutes from "./routes/likes_dislikes_route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(videoRouter);
app.use(userRouter);
app.use(otpRouter);
app.use(likesDislikesRoutes);

connectDB().then(() =>
  app.listen(PORT, () => console.log(`Listening at PORT: ${PORT}.`))
);
