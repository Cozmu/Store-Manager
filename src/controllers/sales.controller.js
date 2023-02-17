const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const { type, message } = await salesService.registerSale(req.body);
  if (type === 'INVALID_INPUT') return res.status(400).json({ message });
  if (type === 'INVALID_QUANTITY') return res.status(422).json({ message });
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  return res.status(201).json(message);
};

const listSales = async (req, res) => {
  const { message } = await salesService.getAllSalesProducts();
  return res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSalesProductsById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteControllerSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteServiceSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).send();
};

const updateControllerSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.updateServiceSale(id, req.body);
  if (type === 'INVALID_QUANTITY') return res.status(422).json({ message }); 
  if (type === 'INVALID_INPUT') return res.status(400).json({ message }); 
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message }); 
  if (type === 'SALE_NOT_FOUND') return res.status(404).json({ message });
  return res.status(200).json(message);
};

module.exports = {
  updateControllerSale,
  deleteControllerSale,
  registerSale,
  listSales,
  listSalesById,
};