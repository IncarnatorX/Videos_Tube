import { User } from "../models/user_model";

const generateAccessAndRefreshToken = async (userID) => {
  try {
    const currentUser = await User.findById(userID);

    if (!currentUser) return new Error("User not found with the given ID.");

    const accessToken = currentUser.generateAccessToken();
    const refreshToken = currentUser.generateRefreshToken();

    currentUser.refreshToken = refreshToken;

    await currentUser.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      "Error generating access and refresh token in utility generateAccessAndRefreshToken function."
    );
    console.error(error.message);
  }
};

export default generateAccessAndRefreshToken;
