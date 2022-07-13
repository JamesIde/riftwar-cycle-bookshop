const express = require("express")
const asyncHandler = require("express-async-handler")
const { create } = require("../models/productModel")
const Product = require("../models/productModel")

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  })
})

const getProduct = asyncHandler(async (req, res) => {
  // Find product based on slug field
  const product = await Product.findOne({ slug: req.params.slug })

  if (!product) {
    return res.status(404).json({
      success: false,
      error: "Product not found",
    })
  }

  res.status(200).send(product)
})

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, imageUrl, isbn, series, published } =
    req.body

  if (
    !name ||
    !price ||
    !description ||
    !imageUrl ||
    !isbn ||
    !series ||
    !published
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill out all fields",
    })
  }

  const product = await Product.create({
    name,
    price,
    description,
    image: imageUrl,
    isbn,
    series,
    published,
  })

  const createProduct = await product.save()
  if (createProduct) {
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: createProduct,
    })
  }
})

module.exports = { getProducts, createProduct, getProduct }
