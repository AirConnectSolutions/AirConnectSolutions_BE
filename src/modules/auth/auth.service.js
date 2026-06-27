import User from "../../models/user.model.js"
import AppError from "../../../utils/AppError.js";
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt.js";
import jwt from "jsonwebtoken"

//signupService
export const signupService = async (userData) => {

  const { email } = userData

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    throw new AppError("Email already exists", 400)
  }

  const user = await User.create(userData)

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

//loginService
export const loginService = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({ email }).select("+password")

  if (!user) {
    throw new AppError("invalid credential", 401)
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    throw new AppError("invalid credential", 401)
  }

  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return {

    accessToken,
    refreshToken,

    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

  }
}


//refreshTokenService
export const refreshAccessTokenService = async (refreshToken) => {

  if (!refreshToken) {
    throw new AppError("Refresh Token is Required", 401);
  }

  try {

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

    const user = await User.findById(decoded.sub);
    if (!user) {
      throw new AppError("User not found", 401);
    }


    const newAccessToken = generateAccessToken(user);

    return { accessToken: newAccessToken };
  } catch (error) {

    throw new AppError("Invalid or expired refresh token. Please login again.", 401);
  }
};
