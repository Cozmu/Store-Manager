const { salesModel } = require('../models');
const validate = require('./validations/validationsInputValues');

const registerSale = async (body) => {
  await body.map((sales) => 'legal');
};

module.exports = {
  registerSale,
};