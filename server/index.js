require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const path = require("path")
const colors = require("colors")
const dbConnect = require("./db/dbConnect")
const cors = require("cors")
dbConnect()

app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(
  cors({
    origin: "*",
  })
)
app.use(express.json())
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/orders", require("./routes/orderRoutes"))
app.use("/api/stripe", require("./routes/stripeAPI"))
app.use("/api/reviews", require("./routes/reviewRoutes"))

//Basic welcome route
app.get("/", (req, res) => {
  res.json({ message: "Enter the universe..." })
})

app.listen(port, () => {
  console.log(`Server is listening on ${port}`.cyan.underline)
})
