const express = require("express")
const router = express.Router()

const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController")
const { protect } = require("../middleware/authMiddleware")
// GET /api/reviews
router.post("/", protect, createReview)
router.get("/", getProductReviews)
module.exports = router
