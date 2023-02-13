const { productsModel } = require('../models');
const validate = require('./validations/validationsInputValues');

const getAllProducts = async () => {
  const resultProduct = await productsModel.findAllProducts();
  return { type: null, message: resultProduct };
};

const getProductById = async (idProduct) => {
  const error = validate.validateId(idProduct);
  if (error.type) return error; 

  const resultProduct = await productsModel.findProductById(idProduct);
  if (!resultProduct) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  return { type: null, message: resultProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
};