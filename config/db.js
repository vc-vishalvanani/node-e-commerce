// 

const mongoose = require("mongoose");
require("dotenv").config();

// 
const uri = 'mongodb://127.0.0.1:27017/userDB';

const initiateMongoServer = () => {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to Mongo DB!");
    } catch (err) { 
        console.log('err: ', err);
        throw err;
    }
}

module.exports = initiateMongoServer;
