import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token Provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: false, message: "invalid token, access denied" });
  }
});
