import mongoose from "mongoose";
import { User } from "../models/user_model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import generateAccessAndRefreshToken from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import formatUser from "../utils/formatUser.js";

dotenv.config();

const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
};

const registerUserController = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  // VALIDATING IF ALL THE FIELDS ARE SUPPLIED
  const allFieldsValidation = [fullname, email, password, username].some(
    (field) => !field?.trim(),
  );

  if (allFieldsValidation) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  // VALIDATING IF THE USER EXISTS
  const userExistsValidation = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExistsValidation)
    return res.status(400).json({ message: "User Already exists." });

  try {
    const user = await User.create({
      fullname,
      email,
      username,
      password,
    });

    if (!user)
      return res
        .status(404)
        .json({ message: "Something wen't wrong while registering the user." });

    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error creating user in user controller: ", error.message);

    return res.status(500).json({
      message:
        "Something wen't wrong. Error while registering the user. Please try again.",
    });
  }
};

const logInUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({ message: "Email and password missing" });

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid)
      return res.status(404).json({ message: "Password Incorrect" });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    await User.findByIdAndUpdate(user._id, {
      $set: { loggedIn: true },
    });

    const loggedInUser = formatUser(user);

    return res.status(200).cookie("refreshToken", refreshToken, options).json({
      message: "Login Successful.",
      user: loggedInUser,
      accessToken,
    });
  } catch (error) {
    console.error("Login Controller errored out: ", error.message);
    return res
      .status(500)
      .json({ message: "Something wen't wrong while trying to log you in." });
  }
};

const logoutUser = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken;

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { refreshTokens: incomingRefreshToken },
      $set: { loggedIn: false },
    });

    return res
      .status(200)
      .clearCookie("refreshToken", options)
      .json({ message: "Logged out" });
  } catch (error) {
    console.error(
      "Unable to logout user from logoutUser controller: ",
      error.message,
    );
    return res
      .status(500)
      .json({ message: "Error occurred while logging out user." });
  }
};

const verifyToken = async (req, res) => {
  const incomingAccessToken =
    req.cookies.accessToken ||
    req.body.accessToken ||
    (req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer ")
      ? req.headers["authorization"].split(" ")[1]
      : null);

  if (!incomingAccessToken)
    return res
      .status(401)
      .json({ message: "No Access Token found -- Try logging again" });

  try {
    const decodedUser = jwt.verify(
      incomingAccessToken,
      process.env.ACCESS_TOKEN_SECRET,
    );

    return res.status(200).json({ isAuthenticated: true, user: decodedUser });
  } catch (error) {
    console.error("Errored out in verifyToken controller: ", error.message);
    return res
      .status(500)
      .json({ message: "Something wen't wrong while trying to Authorize." });
  }
};

const generateNewAccessToken = async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken;

  if (!incomingRefreshToken) {
    return res.status(403).json({ message: "No refresh token found." });
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    // FINDS THE USER WITH THE ID AND USER'S CORRESPONDING REFRESH TOKEN
    const user = await User.findOne({
      _id: decodedToken?._id,
      refreshTokens: { $elemMatch: { $eq: incomingRefreshToken } },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found - Invalid refresh token provided." });
    }

    // GENERATING NEW TOKENS
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id,
    );

    // updating the new refresh token in database
    await User.findByIdAndUpdate(user._id, {
      $pull: { refreshTokens: incomingRefreshToken },
    });

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "New tokens generated", accessToken });
  } catch (error) {
    console.error("Error generating new access");
    return res.status(500).json({
      message:
        "Something wen't wrong while generating new access & refresh tokens.",
    });
  }
};

const getProfileController = async (req, res) => {
  try {
    const user = req.user;

    if (!user) return res.status(400).json({ message: "No user found..." });

    const loggedInUser = formatUser(user);

    return res.status(200).json({ user: loggedInUser });
  } catch (error) {
    console.error("Errored in getProfileController: ", error.message);
    return res
      .status(500)
      .json({ message: "Something went wrong. Please login again" });
  }
};

const editAvatar = async (req, res) => {
  try {
    const { _id } = req.body;

    const avatarFilePath = req.file.path;

    if (!avatarFilePath)
      return res.status(404).json({ message: "No file provided!!" });

    const user = await User.findById(_id);

    await deleteFromCloudinary(user.avatarPublicId, "image");

    const avatarFile = await uploadOnCloudinary(avatarFilePath);

    const avatarPublicId = avatarFile.public_id;

    const avatarUrl = avatarFile.url;

    await User.findByIdAndUpdate(_id, {
      $set: { avatar: avatarUrl, avatarPublicId },
    });

    return res.status(200).json({ message: "Avatar uploaded successfully." });
  } catch (error) {
    console.error("Error while running edit avatar controller: ", error);
    return res.status(500).json({
      message: "Error occurred while updating the avatar. Please try again.",
    });
  }
};

// VERIFY PASSWORD
const verifyPassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password)
      return res.status(404).json({ message: "No password provided!" });

    const user = await User.findById(req.user._id);

    if (!user)
      return res.status(404).json({ message: "Unable to fetch the user." });

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid)
      return res.status(404).json({ message: "Password doesn't match." });

    return res.status(200).json({ message: "Password is correct." });
  } catch (error) {
    console.error("verify password controller errored out: ".error.message);
    return res.status(500).json({
      message:
        "Something wen't wrong while verifying your password. Please try again.",
    });
  }
};

// CHANGE PASSWORD -> User logged in
const changePassword = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const { password } = req.body;

    if (!userId)
      return res
        .status(404)
        .json({ message: "No id available in the request!!" });

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).json({ message: "Invalid User Id.." });

    if (!password)
      return res
        .status(404)
        .json({ message: "No new password found in the request" });

    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ message: "No user found with this id" });

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (isPasswordMatch) {
      return res
        .status(404)
        .json({ message: "Old Password and new password cannot be same." });
    }

    user.password = password;
    user.refreshTokens = [];
    await user.save();

    const logoutOpts = { httpOnly: true, secure: true, sameSite: "None" };

    res.clearCookie("refreshToken", logoutOpts);
    return res
      .status(200)
      .json({ message: "Password changed successful. Please log in again." });
  } catch (error) {
    console.error("Error in reset password controller: ", error.message);
    return res.status(500).json({
      message: "Something wen't wrong while updating your password!!",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(404).json({ message: "No email is the request." });
    }

    if (!password)
      return res
        .status(404)
        .json({ message: "No new password found in the request" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "No user found with this id" });

    user.password = password;
    user.refreshTokens = [];
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successful. Please log in again." });
  } catch (error) {
    console.error("Error in resetPassword component: ", error.message);
    return res.status(500).json({
      message: "Something wen't wrong while updating your password!!",
    });
  }
};

export {
  registerUserController,
  logInUserController,
  logoutUser,
  verifyToken,
  generateNewAccessToken,
  getProfileController,
  editAvatar,
  verifyPassword,
  changePassword,
  resetPassword,
};
