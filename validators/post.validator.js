const Joi = require('joi');

const postValidationSchema = Joi.object({
  title: Joi.string()
    .required()
    .max(250)
    .messages({
      "string.base": "Title must be a string",
      "string.empty": "Title is required",
      "string.max": "Title must not exceed {#limit} characters",
      "any.required": "Title is required",
    }),
  author: Joi.string()
    .required()
    .messages({
      "string.base": "Author must be a string",
      "string.empty": "Author is required",
      "string.max": "Author must not exceed {#limit} characters",
      "any.required": "Author is required",
    }),
  created_at: Joi.date()
    .default(new Date())
    .iso()
    .max('now')
    .messages({
      "date.format": "Date must be a valid ISO 8601 date format",
      "date.max": "Date must be less than {#limit}"
    }),
  content: Joi.string()
    .required()
    .messages({
      "string.base": "Content must be a string",
      "string.empty": "Content is required",
      "any.required": "Content is required",
    })
});

module.exports = postValidationSchema;
