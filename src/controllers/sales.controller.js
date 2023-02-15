const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const { type, message } = await salesService.registerSale(req.body);
  if (type === 'INVALID_INPUT') return res.status(400).json({ message });
  if (type === 'INVALID_QUANTITY') return res.status(422).json({ message });
  if (type === 'PRODUCT_NOT_FOUND') return res.status(404).json({ message });
  return res.status(201).json(message);
};

module.exports = { registerSale };