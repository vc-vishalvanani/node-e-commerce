const HTTP = require("../config/constants");
const signupValidationSchema = require("../validators/signup.validator");
const apiResponse = require("./response.middleware");

function validate(req, res, next) {
  const { error } = signupValidationSchema.validate(req.body);

  if (error) {
    apiResponse(res, HTTP.BAD_REQUEST, error.details?.map((x) => x.message).join(", "), [], error.details);
  } else {
    next();
  }
}

module.exports = { validate };
