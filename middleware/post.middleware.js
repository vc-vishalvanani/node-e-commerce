const HTTP = require("../config/constants");
const postValidationSchema = require("../validators/post.validator");
const apiResponse = require("./response.middleware");

function validate(req, res, next) {
  const { error } = postValidationSchema.validate(req.body);

  if (error) {
    apiResponse(res, HTTP.BAD_REQUEST, error.details?.map((x) => x.message).join(", "), [], error.details);
  } else {
    next();
  }
}

module.exports = { validate };