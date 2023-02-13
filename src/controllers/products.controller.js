const { productsService } = require('../services');
// const errorMap = require('../utils/errorMap');

const listProducts = async (req, res) => {
  const { message } = await productsService.getAllProducts();
  return res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);
  if (type) return res.status(404).json({ message });

  return res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.registerProduct(name);
  if (type) return res.status(422).json({ message });
  return res.status(201).json(message);
};

module.exports = {
  registerProduct,
  listProducts,
  listProductById,
};