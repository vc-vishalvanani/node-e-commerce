const mongoose = require('mongoose');

const OrderItem = new mongoose.Schema({
  sku_id: {
    type: Number,
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const OrderSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  items: [OrderItem],
  total_price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});


const Order = mongoose.model("Orders", OrderSchema);
module.exports = Order;
