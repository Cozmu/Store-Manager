const { salesService } = require('../services');

const registerSale = async (req, res) => {
  const x = await salesService.registerSale(req.body);
};

module.exports = { registerSale };