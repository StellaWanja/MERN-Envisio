import jwt from "jsonwebtoken";
import { RANDOM_TOKEN } from "./config.js";

// Middleware to verify the Bearer token and get the user's ID
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Get the Bearer token from the Authorization header

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized. Token missing or invalid format.",
      status: 401,
    });
  }

  const tokenValue = token.replace("Bearer ", "");

  jwt.verify(tokenValue, RANDOM_TOKEN, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Failed to authenticate token", status: 401 });
    }

    req.user = decoded;
    next();
  });
};

export default verifyToken;
