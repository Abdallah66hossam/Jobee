import jwt from "jsonwebtoken";

export function generateToken(_id, email) {
  // Create a payload with the user information
  const payload = {
    email,
    _id,
  };

  // Create and return the token
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
}
