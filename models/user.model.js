const mongoose = require('mongoose');
const common_methods = require('../common/utility');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  verification_str: {
    type: String,
    default: common_methods.makeId(32)
  },
  reset_pass_verification: {
    type: String,
    default: ''
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
