const { salesModel, productsModel } = require('../models');
const validate = require('./validations/validationsInputValues');

const registerSale = async (body) => {
  const validationArr = body.map((sales) => validate.validateSalesRequired(sales));
  const performValidation = validationArr.find((sale) => sale.type);
  if (performValidation) {
    return performValidation;
  }

  const checkProduct = await Promise
    .all(body.map(({ productId }) => productsModel.findProductById(productId)));
  if (checkProduct.includes(undefined)) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  const salesId = await salesModel.insertSale();

  await Promise.all(body
    .map(({ productId, quantity }) => salesModel.insertSaleProduct(salesId, productId, quantity)));
  
  return { type: null, message: { id: salesId, itemsSold: body } };
};

module.exports = {
  registerSale,
};