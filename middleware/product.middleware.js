const HTTP = require("../config/constants");
const productValidationSchema = require("../validators/product.validator");
const apiResponse = require("./response.middleware");

function validate(req, res, next) {
  const { error } = productValidationSchema.validate(req.body);

  if (error) {
    apiResponse(res, HTTP.BAD_REQUEST, error.details?.map((x) => x.message).join(", "), [], error.details);
  } else {
    next();
  }
}

module.exports = { validate };
