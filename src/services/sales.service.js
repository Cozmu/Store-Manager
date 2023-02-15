const { salesModel } = require('../models');
const validate = require('./validations/validationsInputValues');

const registerSale = async (body) => {
  const validationArr = await body.map((sales) => validate.validateSalesRequired(sales));
  const performValidation = validationArr.find((sale) => sale.type);
  // console.log(performValidation);
  if (performValidation) {
    return performValidation;
  }
  const checkProduct = await Promise
    .all(body.map(({ productId }) => salesModel.findSaleById(productId)));
  console.log(checkProduct);
};

module.exports = {
  registerSale,
};