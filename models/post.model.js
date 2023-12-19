const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    required: true
  }
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
