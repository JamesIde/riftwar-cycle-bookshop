const mongoose = require("mongoose")
const User = require("../models/userModel")
const Review = mongoose.Schema(
  {
    // User
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
    //Product Slug
    productName: {
      type: String,
      required: true,
    },
    reviewDesc: {
      type: String,
      required: true,
    },
    reviewTitle: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Review", Review)
