import { OTP } from "../models/otp_model.js";
import { User } from "../models/user_model.js";
import sendEmail from "../utils/sendOTPEmail.js";

const sendOTPForPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(404)
        .json({ message: "Cannot find email in your request." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Cannot fetch the user details with email." });
    }

    await sendEmail(email, res);

    return res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    console.error(
      "Error in sendOTPForPasswordReset controller: ",
      error.message
    );
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { otp: incomingOTP, email } = req.body;

    if (!incomingOTP) {
      return res.status(404).json({ message: "No OTP found in your request." });
    }

    if (!email) {
      return res.status(404).json({ message: "Cannot find the email." });
    }

    const otpDoc = await OTP.findOne({ email });

    if (!otpDoc) {
      return res.status(404).json({
        message:
          "Unable to process otp verification. Please request for OTP again.",
      });
    }

    const isOTPValid = await otpDoc.isOTPCorrect(incomingOTP);

    if (!isOTPValid) {
      return res.status(404).json({ message: "Invalid OTP." });
    }

    const isOTPExpired = otpDoc.isOTPExpired();

    if (isOTPExpired) {
      return res
        .status(404)
        .json({ message: "Your OTP has expired. Please request again." });
    }

    await OTP.findByIdAndDelete(otpDoc._id);

    return res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error(
      "Error in verifyOTP controller: ",
      error.message,
      error.cause
    );
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export { sendOTPForPasswordReset, verifyOTP };
