const Joi = require('joi');

const productValidationSchema = Joi.object({
    name: Joi.string().when({is: Joi.exist(), then: Joi
        .required()
        .messages({
            "string.base": "Name must be a string",
            "string.empty": "Name is required",
            "any.required": "Name is required",
        }), otherwise: Joi.optional()}),
    // name: Joi.string()
    //     .required()
    //     .max(40)
    //     .messages({
    //         "string.base": "Name must be a string",
    //         "string.empty": "Name is required",
    //         "string.max": "Name must not exceed 40 characters",
    //         "any.required": "Name is required",
    //     }),
    sku_id: Joi.string()
        .required()
        .messages({
            "string.base": "sku_id must be a string",
            "string.empty": "sku_id is required",
            "any.required": "sku_id is required",
        }),
    created_at: Joi.date()
        .default(new Date())
        .iso()
        .max('now')
        .messages({
            "date.format": "Date must be a valid ISO 8601 date format",
            "date.max": "Date must be less than {#limit}"
        }),
    qty: Joi.number()
        .required()
        .min(1)
        .messages({
            "string.base": "Quantity must be a number",
            "string.empty": "Quantity is required",
            "string.min": "Must be greater than or equal to 1.",
            "any.required": "Quantity is required",
        }),
    description: Joi.string()
        .required()
        .messages({
            "string.base": "Description must be a string",
            "string.empty": "Description is required",
            "any.required": "Description is required",
        }),
    price: Joi.number()
        .required()
        .min(1)
        .messages({
            "string.base": "Price must be a number",
            "string.empty": "Price is required",
            "any.required": "Price is required",
            "string.min": "Must be greater than or equal to 1.",
        })
});

module.exports = productValidationSchema;
