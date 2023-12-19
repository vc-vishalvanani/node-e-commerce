const Product = require("../models/product.model");
const HTTP = require("../config/constants");

exports.add = async (req, res) => {
    try {

      const item = await Product.find({
        "sku_id": req.body.sku_id
      })
      if(item.length) {
        res.status(HTTP.CONFLICT).send({message: "Product is already exist!"});
      }

      const product = new Product(req.body);
      await product.save();
      res.status(HTTP.OK).send({
        message: "Product added successfully!",
      });
    } catch (error) {
      console.log({ error });
      res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
    }
  };

exports.update = async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, req.body);
    res.status(HTTP.OK).send({
      message: "Product updated successfully!"
    });
  } catch (error) {
    console.log(error);
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

exports.get = async (req, res) => {
  try {

    const sort  = {};
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = limit * (page-1);
    const { name, sortBy, orderBy } = req.query;

    if (sortBy && orderBy) {
      sort[sortBy] = orderBy === 'asc' ? 1 : -1;
    }

    const query = {};
    if(name) {
      query.name = name;
    }

    const products = await Product.find(query).sort(sort).limit(limit).skip(skip);
    res.status(HTTP.OK).send({
      message: "Products loaded successfully!",
      data: products,
    });
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

exports.getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(HTTP.OK).send({
      message: "Product loaded successfully!",
      data: product,
    });
  } catch(error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

exports.delete = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(HTTP.OK).send({
      message: "Product deleted successfully!"
    });
  } catch(error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}
