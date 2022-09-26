const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ message: "Please fill out all fields" })
  }

  const user = await User.findOne({ email })

  if (!user) {
    res.status(400).json({ message: "No account found, please register!" })
  }

  // Compare plain password with password stored in database
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    res.status(400).json({ message: "Incorrect password" })
  } else {
    // Return the user
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body

  //    Check if all fields are filled out
  if (!name || !email || !password || !password2) {
    res.status(400).json({ message: "Please fill out all fields" })
  }

  // check if user already registered
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400).json({ message: "User is already registed!" })
  }

  // check if passwords match
  if (password !== password2) {
    res.status(400).json({ message: "Passwords do not match!" })
  }

  // Hash the password
  const hashPassword = bcrypt.hashSync(password, 12)

  // Create the user
  const user = new User({
    name,
    email,
    password: hashPassword,
  })

  // Save the user
  const createUser = await user.save()

  if (createUser) {
    res.status(201).json({
      message: "User created successfully!",
      id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      token: generateToken(createUser._id),
    })
  }
})

const updateUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body

  const currentUser = await User.findOne({ id: req.user._id })

  try {
    const updateUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        name,
        email,
      },
      {
        new: true,
      }
    )
    res.status(200).json({
      updatedUser: {
        name: updateUser.name,
        email: updateUser.email,
      },
    })
  } catch (error) {
    console.log(error)
  }
  // console.log(currentUser._id.toString())
})

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  })
})

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7day",
  })
}
module.exports = { registerUser, loginUser, getMe, updateUser }
