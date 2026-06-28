import express from "express";
import { signup, handleRefreshToken, adminLogin, agentLogin } from "./auth.controller.js"
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import { signupSchema, loginSchema } from "./auth.validation.js";


const router = express.Router()

router.post('/signup', validate(signupSchema), signup)
router.post('/admin/login', validate(loginSchema), adminLogin)
router.post('/agent/login', validate(loginSchema), agentLogin)
//for testing
router.post("/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user
  })
})

router.post("/refresh-token", handleRefreshToken);




export default router
