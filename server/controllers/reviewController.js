const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const Review = require("../models/reviewModel")
const Product = require("../models/productModel")

const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ productName: req.query.slug })
  if (!reviews) {
    return res.status(404).json({
      message: "No reviews found",
      average: 0,
    })
  }

  res.status(200).json({
    reviews,
  })
})

const getAverageRating = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ productName: req.query.slug })

  if (reviews.length === 0) {
    return res.status(200).json({
      average: 0,
    })
  } else {
    // Calculate average rating
    const average =
      reviews.reduce((acc, curr) => {
        return acc + curr.rating
      }, 0) / reviews.length

    res.status(200).json({
      average,
    })
  }
})

const createReview = asyncHandler(async (req, res) => {
  // Check a user was passed in
  const reviewUser = await User.findOne({ userId: req.user.id })

  if (!reviewUser) {
    return res.status(400).json({
      message: "User does not exist",
    })
  }
  // Check body for required fields
  const { rating, reviewDesc, reviewTitle } = req.body
  if (!rating || !reviewDesc || !reviewTitle) {
    return res.status(400).json({
      message: "Please provide a rating and review",
    })
  }
  // Construct new review
  const newReview = {
    userId: reviewUser.id,
    userName: reviewUser.name,
    productName: req.query.slug,
    reviewTitle,
    reviewDesc,
    rating,
  }
  // Create review
  const createdReview = await Review.create(newReview)

  if (createdReview) {
    return res.status(201).json({
      message: "Review created successfully",
      review: createdReview,
    })
  }
})
module.exports = { createReview, getProductReviews, getAverageRating }
