const express = require("express")
const router = express.Router()

const {
  createReview,
  getProductReviews,
  getAverageRating,
} = require("../controllers/reviewController")
const { protect } = require("../middleware/authMiddleware")
// GET /api/reviews
router.post("/", protect, createReview)
router.get("/", getProductReviews)
router.get("/rating", getAverageRating)
module.exports = router
