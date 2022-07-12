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

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, imageUrl } = req.body

  if (!name || !price || !description || !imageUrl) {
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

module.exports = { getProducts, createProduct }