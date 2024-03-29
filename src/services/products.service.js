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

const registerProduct = async (name) => {
  const error = validate.validateName(name);
  if (error.type) return error;
  const id = await productsModel.insertProduct(name);
  return { type: null, message: { id, name } };
};

const updateServiceProtuct = async (id, name) => {
  const error = validate.validateName(name);
  if (error.type) return error;
  const checkProduct = await productsModel.findProductById(id);
  if (!checkProduct) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  await productsModel.updateModelProtuct(id, name);
  return { type: null, message: { id, name } };
};

const deleteServiceProduct = async (id) => {
  const checkProduct = await productsModel.findProductById(id);
  if (!checkProduct) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  await productsModel.deleteModelProduct(id);
  return { type: null, message: '' };
};

const getProductBySearch = async (name) => {
  if (!name) {
    const allProducts = await productsModel.findAllProducts();
    return { type: null, message: allProducts };
  }

  const searchName = await productsModel.findProductBySearch(name);
  return { type: null, message: searchName };
};

module.exports = {
  getProductBySearch,
  deleteServiceProduct,
  registerProduct,
  getAllProducts,
  getProductById,
  updateServiceProtuct,
};