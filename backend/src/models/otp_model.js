import mongoose from "mongoose";
import bcrypt from "bcrypt";

const otpModelSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    otpExpiresOn: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

otpModelSchema.index({ createdAt: 1 }, { expireAfterSeconds: 900 });

otpModelSchema.pre("save", async function (next) {
  if (!this.isModified("otp")) return next();
  this.otp = await bcrypt.hash(this.otp, 10);
  next();
});

otpModelSchema.methods.isOTPCorrect = async function (otp) {
  return await bcrypt.compare(otp, this.otp);
};

otpModelSchema.methods.isOTPExpired = function () {
  return Date.now() > this.otpExpiresOn;
};

export const OTP = mongoose.model("OTP", otpModelSchema);
