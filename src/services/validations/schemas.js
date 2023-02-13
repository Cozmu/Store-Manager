const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const validName = Joi.string().min(5);

module.exports = {
  idSchema,
  validName,
};