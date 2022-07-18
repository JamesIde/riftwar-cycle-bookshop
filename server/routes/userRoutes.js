const express = require("express")
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  updateUser,
} = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

// Routes
router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/update", protect, updateUser)
router.get("/getMe", protect, getMe)
module.exports = router
