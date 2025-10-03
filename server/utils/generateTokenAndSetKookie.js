import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";

const generateTokenAndSetKookie = (res, userId) => {
  const token = jwt.sign(
    { id: userId },
    JWT_SECRET,
    {
      expiresIn: "15day",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: "none", // Prevent CSRF attacks
    maxAge: 360000000,
  });
};
export default generateTokenAndSetKookie ;