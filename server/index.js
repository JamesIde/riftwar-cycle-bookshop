require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT
const colors = require("colors")
const dbConnect = require("./db/dbConnect")
//  Product Routes
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")
const { urlencoded } = require("express")

dbConnect()

app.get("/", (req, res) => {
  res.send("Hello and Welcome to the site")
})

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use(express.json())
app.use("/api/user", userRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)
app.listen(port, () => {
  console.log(`Server is listening on ${port}`.cyan.underline)
})
