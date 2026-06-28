import express from "express";
import { signup, handleRefreshToken, adminLogin, agentLogin } from "./auth.controller.js"
import { validateSignup } from "./auth.validation.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = express.Router()

router.post('/signup', validateSignup, signup)
router.post('/admin/login', adminLogin)
router.post('/agent/login', agentLogin)
//for testing
router.post("/profile", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user
  })
})

router.post("/refresh-token", handleRefreshToken);




export default router
