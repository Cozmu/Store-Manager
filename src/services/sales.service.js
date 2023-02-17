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

const getAllSalesProducts = async () => {
  const resultAllSalesProducts = await salesModel.findAllSalesProducts(); 
  return { type: null, message: resultAllSalesProducts };
};

const getSalesProductsById = async (saleID) => {
  const resultSalesProductsById = await salesModel.findSalesProductsById(saleID);
  if (resultSalesProductsById.length < 1) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: resultSalesProductsById };
};

const deleteServiceSale = async (saleID) => {
  const checkSale = await salesModel.findSaleById(saleID);
  if (checkSale.length < 1) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }
  await salesModel.deleteModelSale(saleID);
  return { type: null, message: '' };
};

const updateServiceSale = async (id, body) => {
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

  const checkSale = await salesModel.findSaleById(id);
  if (checkSale.length < 1) {
    return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };
  }

  await Promise.all(body
    .map(({ productId, quantity }) => salesModel.updateModelSale(quantity, productId, id)));
  return { type: null, message: { saleId: id, itemsUpdated: body } };
};

module.exports = {
  deleteServiceSale,
  updateServiceSale,
  registerSale,
  getAllSalesProducts,
  getSalesProductsById,
};