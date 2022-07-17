const asyncHandler = require("express-async-handler")
require("dotenv").config()

const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

const createCheckout = asyncHandler(async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.user._id.toString(),
      userName: req.user.name,
      cart: JSON.stringify(req.body.cart),
    },
  })

  const taxRate = await stripe.taxRates.create({
    display_name: "Sales Tax",
    inclusive: false,
    percentage: 15,
    country: "AU",
    state: "SA",
    jurisdiction: "AU",
    description: "SA Sales Tax",
  })
  // Create the array of items to show in session
  const line_items = req.body.cart.map(item => {
    return {
      price_data: {
        currency: "aud",
        product_data: {
          name: item.productName,
          images: [item.imageUrl],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
      tax_rates: [taxRate.id],
    }
  })

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["AU"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "aud",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "aud",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    customer: customer.id,
    line_items,
    mode: "payment",

    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/checkout`,
  })

  res.send({ url: session.url, sessionId: session.id })
})

module.exports = { createCheckout }
