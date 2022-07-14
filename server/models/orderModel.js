const mongoose = require("mongoose")

const orderItemSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
})

const Order = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    orderItems: [orderItemSchema],
    total: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["NEW", "PROCESSING", "SHIPPED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("orderItemSchema", orderItemSchema)
module.exports = mongoose.model("Order", Order)
