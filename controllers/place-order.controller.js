const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const HTTP = require("../config/constants");
const common_methods = require('../common/utility');

async function prepareCartItems(cartItems) {
    let promises = [];
    let items = [];
    let price = 0;
    cartItems.forEach(async cartItem => {
        promises.push(Product.find({
            "sku_id": cartItem.sku_id
        }).select("price"))
    })
    
    let promisesRes = await Promise.all(promises);
    cartItems.forEach((cartItem, index) => {
        items.push({
            sku_id: cartItem.sku_id,
            qty: cartItem.qty,
            price: promisesRes[index][0].price || 0
        })
        if(promisesRes[index].length) {
            price += cartItem.qty * promisesRes[index][0].price
        }
    })
    return {items, price}
}

exports.placeOrder = async (req, res) => {
    try {
        const cartItems = await Cart.find({
            "user_id": req.user.id
        }).select("sku_id qty");
        if(cartItems.length)  {

            cartItemsPayload = await prepareCartItems(cartItems);
    
            const finalPayload = {
                user_id: req.user.id,
                items: cartItemsPayload.items,
                total_price: cartItemsPayload.price
            }
    
            const order = new Order(finalPayload);
            await order.save();

            // -- Removed Items from cart
            await Cart.deleteMany({ "user_id": req.user.id })

            // -- Update product Quantity
            cartItems.forEach(async product => {
                const item = await Product.find({
                    "sku_id": product.sku_id
                }).select("_id qty")
                if(item.length) {
                  await Product.updateOne({ _id: item[0]._id },  { $set: { "qty" : item[0].qty - product.qty }});
                }
            });
            
            // --- Send Place Order Success Mail
            common_methods.sendMail(req.user.email, "Your purchase was successful", "Your order place successfully")
            res.status(HTTP.OK).send({
                message: "Order Place successfully!",
            });
        } else {
            res.status(HTTP.OK).send({message: "Cart is empty!"})
        }
    } catch (error) {
        res.status(HTTP.BAD_REQUEST).send({ message: "Something went wrong!", error });
    }
}
