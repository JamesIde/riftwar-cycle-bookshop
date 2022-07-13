const mongoose = require("mongoose")
var slug = require("mongoose-slug-generator")
mongoose.plugin(slug)
const Product = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
    },
    series: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      slug: "name",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Product", Product)
