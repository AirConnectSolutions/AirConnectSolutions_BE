import User from "../../models/user.model.js"
import { loginService, signupService, refreshAccessTokenService } from "./auth.service.js"

//signup 
export const signup = async (req, res, next) => {
  try {

    const user = await signupService(req.body)
    return res.status(201).json({
      success: true,
      message: "user created successfully",
      data: user
    })

  } catch (error) {
    next(error)
  }
}

//login
// export const login = async (req, res, next) => {
//   try {
//     const data = await loginService(req.body)
//     return res.status(200).json({
//       succes: true,
//       message: "login successfull",
//       data
//     })
//   } catch (error) {
//     next(error)
//   }
// }
export const adminLogin = async (req, res, next) => {
  try {
    const data = await loginService({ ...req.body, role: "admin" })
    return res.status(200).json({
      success: true,
      message: "Admin login successful",
      data
    })
  } catch (error) {
    next(error)
  }
}


//  AGENT LOGIN 
export const agentLogin = async (req, res, next) => {
  try {
    const data = await loginService({ ...req.body, role: "agent" })
    return res.status(200).json({
      success: true,
      message: "Agent login successful",
      data
    })
  } catch (error) {
    next(error)
  }
}

//refreshToken
export const handleRefreshToken = async (req, res, next) => {
  try {

    const { refreshToken } = req.body;

    const result = await refreshAccessTokenService(refreshToken);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};