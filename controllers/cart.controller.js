const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const HTTP = require("../config/constants");

exports.add = async (req, res) => {
  try {

    // --- Find Product
    const item = await Product.find({
      "sku_id": req.body.sku_id
    }).select("qty");
    if(item.length) {

      // --- Check if quantity is available or not
      if(item[0].qty >= req.body.qty) {
        req.body.user_id = req.user.id;
    
        const product = await Cart.find({
          "user_id": req.user.id,
          "sku_id": req.body.sku_id
        });
        if(product.length) {
          await Cart.updateOne({ _id: product[0]._id }, {...req.body});
        } else {
          const cart = new Cart(req.body);
          await cart.save();
        }
    
        res.status(HTTP.OK).send({
          message: "Product added in cart successfully!",
        });
      } else {
        res.status(HTTP.CONFLICT).send({message: "Quantity not available!"});
      }
    } else {
      res.status(HTTP.CONFLICT).send({message: "Product not found!"});
    }

  } catch (error) {
    console.log({ error });
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
};

exports.delete = async (req, res) => {
  try {
    const product = await Cart.findById(req.params.id);
    if(product && product?.user_id == req.user.id) {
      await Cart.deleteOne({ _id: req.params.id });
      res.status(HTTP.OK).send({
        message: "Item removed successfully!"
      });
    } else {
      res.status(HTTP.UNAUTHORIZED).send({message: "Unauthorized"});
    }
  } catch (error) {
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}

async function prepareProductData(products) {
  // --- get product data
  let promises = [];

  products.forEach(product => {
    promises.push(Product.find({
      "sku_id": product.sku_id
    }).select('name'))
  });

  const promisesRes = await Promise.all(promises);
  products.map((product, index) => {
    product.name = promisesRes[index][0].name
  })
  return products;
}

exports.get = async (req, res) => {
  try {
    let products = await Cart.find({
      "user_id": req.user.id
    });

    products = await prepareProductData(products);
    res.status(HTTP.OK).send({
      message: "Success",
      items: products
    });
  } catch (error) {
    console.log({ error });
    res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
  }
}
