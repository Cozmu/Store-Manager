const { salesService } = require('../services');

const registerSale = async (req, _res) => {
  const a = await salesService.registerSale(req.body);
  console.log(a);
};

module.exports = { registerSale };