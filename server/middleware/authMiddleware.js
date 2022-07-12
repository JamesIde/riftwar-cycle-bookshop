const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const protect = asyncHandler(async (req, res, next) => {
  try {
    // Get the token from the req.header
    const token =
      req.header("x-auth-token") || req.header("authorization").split(" ")[1]

    // Check if no token
    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    // Decode the token as it contains the userID
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const checkUser = await User.findById(decoded.id).select("-password")

    // Check if user exists
    if (!checkUser) {
      return res.status(401).json({ message: "User does not exist" })
    }

    // Add user to the req.user
    req.user = checkUser
    next()
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" })
  }
})

module.exports = { protect }
