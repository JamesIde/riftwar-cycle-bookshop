const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

// Routes
router.post("/register", registerUser)
router.post("/login", loginUser)

router.get("/getMe", protect, getMe)
module.exports = router
