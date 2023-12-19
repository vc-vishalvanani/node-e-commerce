const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    sku_id: {
      type: Number,
      required: true
    },
    qty: {
      type: Number,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    user_id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    }
  });
  
  const Cart = mongoose.model("Cart", CartSchema);
  module.exports = Cart;
