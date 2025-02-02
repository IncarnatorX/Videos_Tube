import { User } from "../models/user_model.js";
import generateAccessAndRefreshToken from "../utils/generateTokens.js";

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

    const isPasswordValid = user.isPasswordCorrect(password);
    if (!isPasswordValid)
      return res.status(404).json({ message: "Password Incorrect" });

    const { accessToken, refreshToken } = generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({ message: "Login Successful." });
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

export { registerUserController, logInUserController };
