import { User } from "../models/user_model";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const incomingAccessToken = req.cookies.accessToken || req.body.accessToken;

  if (!incomingAccessToken)
    throw new Error("No incoming access token found in auth middleware.");

  try {
    const decodedToken = jwt.verify(
      incomingAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new Error("Unable to find a user in auth middleware");

    req.user = user;

    next();
  } catch (error) {
    console.error("Auth Middleware failure: ", error.message);
  }
};

export default verifyJWT;
