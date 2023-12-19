const HTTP = require("../config/constants");
const apiResponse = require("./response.middleware");

const jwt = require('jsonwebtoken');
require("dotenv").config();

function authVerify(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return apiResponse(res, HTTP.UNAUTHORIZED, "UnAuthorized", []);
  }

  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return apiResponse(res, HTTP.BAD_REQUEST, "UnAuthorized", []);
    }

    req.user = user;
    next();
  });
}

module.exports = { authVerify };