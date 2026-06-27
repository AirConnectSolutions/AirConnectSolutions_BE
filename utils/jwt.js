import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {

  return jwt.sign(
    {
      sub: user._id.toString(),
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_ACCESS_EXPIRES
    }
  )
}

export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString()
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES }
  )
}