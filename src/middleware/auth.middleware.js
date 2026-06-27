import jwt from "jsonwebtoken"
import AppError from "../../utils/AppError.js";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError("Access Token is Required", 401)
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError("Invalid authorization header", 401)
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.sub).select("name email role")

    if (!user) {
      throw new AppError("user not found", 401)
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }


}