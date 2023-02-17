const express = require('express');
const { productsController } = require('../controllers');
const validateName = require('../middlewares/validateName');

const router = express.Router();

router.get(
  '/',
  productsController.listProducts,
);

router.get(
  '/:id',
  productsController.listProductById,
);

router.post(
  '/',
  validateName,
  productsController.registerProduct,
);

router.put(
  '/:id',
  productsController.updateControllerProtuct,
);

module.exports = router;
