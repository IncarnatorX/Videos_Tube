import dotenv from "dotenv";
import nodemailer from "nodemailer";
import generateOTP from "./generateOTP.js";
import { OTP } from "../models/otp_model.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const otp = generateOTP();

const sendEmail = async (email, res) => {
  try {
    const otpDocExists = await OTP.findOne({ email });

    if (otpDocExists) {
      return res.status(404).json({
        message:
          "OTP has already been sent. Please check your inbox or spam. If not, please try again after 15 minutes.",
      });
    }

    const otpDoc = await OTP.create({
      otp,
      otpExpiresOn: new Date(Date.now() + 10 * 60 * 1000),
      email,
    });

    if (!otpDoc) {
      return res.status(404).json({
        message: "Unable to save the OTP to the database.",
      });
    }

    const info = await transporter.sendMail({
      from: "VideosTube",
      to: email,
      subject: "Your OTP for resetting the password",
      //   text: `Hello, \n\nHere is your OTP: ${otp}. \n\n Thank you.`,
      html: `<p style="font-size: 14px">Hello, <br/><br/> Here is your OTP: ${otp}. <br/><br/> The OTP will expired in 10 minutes.<br/><br/> Thank you.</p>`,
    });

    if (!info.messageId) {
      return res.status(404).json({
        message: "Unable to send an email. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error while sending email: ", error.message);
  }
};

export default sendEmail;
