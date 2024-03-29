 const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const validName = Joi.string().min(5).required().messages({
  'any.required': '"name" is required',
  'string.min': '"name" length must be at least 5 characters long',
});

const addValidateSales = Joi.object().keys({
  productId: Joi.number().min(1).required(),
  quantity: Joi.number().min(1).required(),
}).messages({
  'any.required': '"{#key}" is required',
  'number.min': '"{#key}" must be greater than or equal to 1',
});

module.exports = {
  addValidateSales,
  idSchema,
  validName,
};