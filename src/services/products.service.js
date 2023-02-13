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

const registerProduct = async (productName) => {
  const error = validate.validateName(productName);
  if (error.type) return error;
  const newProduct = await productsModel.insertProduct(productName);
  const resultNewProduct = await productsModel.findProductById(newProduct);
  return { type: null, message: resultNewProduct };
};

module.exports = {
  registerProduct,
  getAllProducts,
  getProductById,
};