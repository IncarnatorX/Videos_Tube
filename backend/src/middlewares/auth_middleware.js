import { User } from "../models/user_model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  const incomingAccessToken = req.cookies.accessToken || req.body.accessToken;

  if (!incomingAccessToken)
    return res.status(401).json({ message: "No incoming access token found." });

  try {
    const decodedToken = jwt.verify(
      incomingAccessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user)
      return res.status(401).json({ message: "Unable to find a user.." });

    req.user = user;
    console.log("Verify JWT Controller accessed successfully");

    next();
  } catch (error) {
    console.error("Auth Middleware failure: ", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired!" });
    }

    return res.status(401).json({ message: "JWT Expired." });
  }
};

export default verifyJWT;
