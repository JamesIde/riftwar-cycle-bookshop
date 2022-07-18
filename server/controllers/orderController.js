const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ userId: req.user._id })

  if (!orders) {
    return res.status(404).json({
      success: false,
      message: "No orders found",
    })
  } else {
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    })
  }
})

const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id })

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    })
  }

  //Check the user belongs to the order
  if (order.userId !== req.user._id.toString()) {
    return res.status(401).json({
      success: false,
      message: "You are not authorized to view this order",
    })
  }
  res.status(200).json({
    success: true,
    data: order,
  })
})

module.exports = { getAllOrders, getSingleOrder }
