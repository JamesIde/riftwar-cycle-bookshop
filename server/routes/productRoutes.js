const express = require("express")
const router = express.Router()

//Bring in controllers
const {
  getProducts,
  createProduct,
  getProduct,
} = require("../controllers/productController")

router.get("/", getProducts)
router.get("/:slug", getProduct)
router.post("/", createProduct)

module.exports = router
