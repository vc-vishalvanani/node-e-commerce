const Joi = require('joi');

const signupValidationSchema = Joi.object({
    name: Joi.string()
      .required()
      .max(20)
      .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.max": "Name must not exceed 20 characters",
        "any.required": "Name is required",
      }),
      username: Joi.string()
      .required()
      .messages({
        "string.base": "username must be a string",
        "string.empty": "username is required",
        "string.max": "username must not exceed 15 characters",
        "any.required": "username is required",
      }),
    created_at: Joi.date()
      .default(new Date())
      .iso()
      .max('now')
      .messages({
        "date.format": "Date must be a valid ISO 8601 date format",
        "date.max": "Date must be less than {#limit}"
      }),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'cloud'] } })
      .required()
      .messages({
        "string.base": "Email must be a string",
        "string.empty": "Email is required",
        "any.required": "Email is required",
      }),
      password: Joi.string()
      .min(6)
      .required()
      .messages({ 'any.only': 'Password is required!' })
  });
  
  module.exports = signupValidationSchema;
