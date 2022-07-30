require("dotenv").config()

const express = require("express")
const app = express()
const port = process.env.PORT
const colors = require("colors")
const dbConnect = require("./db/dbConnect")
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
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/orders", require("./routes/orderRoutes"))
app.use("/api/stripe", require("./routes/stripeAPI"))
app.use("/api/reviews", require("./routes/reviewRoutes"))

// Serve frontend
if (process.env.NODE_ENV === "production") {
  // Set build folder
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "client", "build", "index.html")
  )
} else {
  //Basic welcome route
  app.get("/", (req, res) => {
    res.json({ message: "Enter the universe..." })
  })
}

app.listen(port, () => {
  console.log(`Server is listening on ${port}`.cyan.underline)
})
