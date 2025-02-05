import { User } from "../models/user_model.js";
import generateAccessAndRefreshToken from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

const registerUserController = async (req, res) => {
  const { fullname, email, password, username } = req.body;

  // VALIDATING IF ALL THE FIELDS ARE SUPPLIED
  const allFieldsValidation = [fullname, email, password, username].every(
    (field) => field.trim() === ""
  );

  if (allFieldsValidation) {
    res.status(400).json({ message: "All Fields are required." });
  }

  // VALIDATING IF THE USER EXISTS
  const userExistsValidation = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExistsValidation)
    res.status(400).json({ message: "User Already exists." });

  try {
    const user = await User.create({
      fullname,
      email,
      username,
      password,
    });

    if (!user)
      res
        .status(404)
        .json({ message: "Something wen't wrong while registering the user." });

    return res.status(200).json({ message: "User Created Successfully" });
  } catch (error) {
    console.error("Error creating user in user controller: ", error.message);

    res
      .status(404)
      .json({ message: "Error while registering the user. Please try again." });
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
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!loggedInUser)
      return res.status(404).json({ message: "User not found!" });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        message: "Login Successful.",
        user: loggedInUser,
        accessToken,
        refreshToken,
      });
  } catch (error) {
    console.error("Login Controller errored out: ", error.message);
    res.status(404).json({ message: "Login Unsuccessful" });
  }
};

const logoutUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $set: { refreshToken: null },
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json({ message: "Logged out" });
  } catch (error) {
    console.error(
      "Unable to logout user from logoutUser controller: ",
      error.message
    );
    res.status(404).json({ message: "Error occurred while logging out user." });
  }
};

const verifyToken = async (req, res) => {
  const incomingAccessToken = req.cookies.accessToken || req.body.accessToken;
  if (!incomingAccessToken)
    return res
      .status(401)
      .json({ message: "No Access Token found -- Try logging again" });

  try {
    const decodedUser = jwt.verify(
      incomingAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({ isAuthenticated: true, user: decodedUser });
  } catch (error) {
    console.error("Errored out in verifyToken controller: ", error.message);
    res.status(401).json({ message: "Access token expired or not found." });
  }
};

const generateNewAccessToken = async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) throw new Error("No refresh token found.");

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) throw new Error("No user found - Invalid refresh token");

    if (incomingRefreshToken !== user.refreshToken)
      throw new Error(
        "User refresh token doesn't match incoming refresh token."
      );

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "New tokens generated" });
  } catch (error) {
    console.error("Error generating new access");
    res.status(404).json({
      message:
        "Something wen't wrong while generating new access & refresh tokens.",
    });
  }
};

const getProfileController = async (req, res) => {
  try {
    if (!req.user) throw new Error({ message: "No user found..." });
    console.log(req.user);
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Errored in getProfileController: ", error.message);
    return res
      .status(404)
      .json({ message: "Something wen't wrong. Please login again" });
  }
};

export {
  registerUserController,
  logInUserController,
  logoutUser,
  verifyToken,
  generateNewAccessToken,
  getProfileController,
};
