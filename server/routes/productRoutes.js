const express = require("express")
const router = express.Router()

//Bring in controllers
const {
  getProducts,
  createProduct,
} = require("../controllers/productController")

router.get("/", getProducts)
router.post("/", createProduct)

module.exports = router
