const { productsService } = require('../services');

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

const listProductBySearch = async (req, res) => {
  const { q } = req.query;
  const { message } = await productsService.getProductBySearch(q);
  return res.status(200).json(message);
};

const registerProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.registerProduct(name);
  if (type) return res.status(422).json({ message });
  return res.status(201).json(message);
};

const updateControllerProtuct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateServiceProtuct(id, name);
  if (type === 'INVALID_NAME') return res.status(422).json({ message });
  if (type === 'NAME_IS_REQUIRED') return res.status(400).json({ message });
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteControllerProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteServiceProduct(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).send();
};

module.exports = {
  listProductBySearch,
  deleteControllerProduct,
  updateControllerProtuct,
  registerProduct,
  listProducts,
  listProductById,
};