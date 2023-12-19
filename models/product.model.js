const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    sku_id: {
      type: Number,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    qty: {
      type: Number,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
      type: Number,
      required: true
    }
  });
  
  const Product = mongoose.model("products", ProductSchema);
  module.exports = Product;
