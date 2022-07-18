const express = require("express")
const router = express.Router()
const { createCheckout } = require("../controllers/stripeController")
const { protect } = require("../middleware/authMiddleware")
const Order = require("../models/orderModel")
router.post("/create-checkout-session", protect, createCheckout)

const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret

// Create Order
const createOrder = async (customer, data) => {
  try {
    const order = await Order.create({
      orderId: data.id,
      userId: customer.metadata.userId,
      userName: customer.metadata.userName,
      customerId: customer.id,
      userEmail: customer.email,
      products: JSON.parse(customer.metadata.cart),
      // total: data.amount_total / 100,
      total: {
        tax: data.total_details.amount_tax / 100,
        itemTotal: data.amount_subtotal / 100,
        orderTotal: data.amount_total / 100,
      },
      shipping: data.shipping.address,
      status: data.status,
      paymentStatus: data.payment_status,
    })
    console.log(order.orderId)
    return order
  } catch (error) {
    console.log(error)
  }
}

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"]

    let data
    let eventType

    if (endpointSecret) {
      let event
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          sig,
          endpointSecret
        )
        console.log("Verified webhook event: ", event.type)
      } catch (err) {
        console.log(err.message)
        response.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
      data = event.data.object
      eventType = event.type
    } else {
      data = request.body.data.object
      eventType = request.body.type
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      await stripe.customers
        .retrieve(data.customer)
        .then(customer => {
          createOrder(customer, data)
        })
        .catch(error => console.log(error))
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send().end
  }
)

module.exports = router
