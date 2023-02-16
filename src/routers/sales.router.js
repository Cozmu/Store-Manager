const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  salesController.registerSale,
);

router.get(
  '/',
  salesController.listSales,
);

router.get(
  '/:id',
  salesController.listSalesById,
);

module.exports = router;