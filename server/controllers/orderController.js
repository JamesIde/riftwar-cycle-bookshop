const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")

// TODO Change this controller up to create a stripe session, but use the logic here to create an order after the payment is complete
const createOrder = asyncHandler(async (req, res) => {
  // Destructure user details
  const { email, name, phone, address, country, city, state, postcode } =
    req.body.user

  // Get the user ID
  const userId = req.user._id

  const cart = req.body.cart

  const createOrder = await Order.create({
    user: userId,
    email: email,
    name,
    phone,
    address,
    country,
    city,
    state,
    postcode,
    orderItems: cart,
    total: parseFloat(req.body.totalCost),
  })

  if (createOrder) {
    res.status(201).json({
      success: true,
      order: createOrder,
    })
  }
})

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

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
  const order = await Order.findById(req.params.id)

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "Order not found",
    })
  } else {
    //Check the user belongs to the oder
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to view this order",
      })
    } else {
      res.status(200).json({
        success: true,
        data: order,
      })
    }
  }
})

module.exports = { createOrder, getAllOrders, getSingleOrder }
