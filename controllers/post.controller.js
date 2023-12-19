const Post = require("../models/post.model");
const HTTP = require("../config/constants");

exports.add = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(HTTP.CREATED).send({
      message: "Post created successfully!",
    });
  } catch (error) {
    console.log({ error });
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.update = async (req, res) => {
  try {
    await Post.updateOne({ _id: req.params.id }, req.body);
    res.status(HTTP.OK).send({
      message: "Post updated successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.delete = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.status(HTTP.OK).send({
      message: "Post deleted successfully!"
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.get = async (_, res) => {
  try {
    const posts = await Post.find();
    res.status(HTTP.OK).send({
      message: "Posts loaded successfully!",
      data: posts,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.getById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(HTTP.OK).send({
      message: "Post loaded successfully!",
      data: post,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};