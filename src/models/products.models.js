const connection = require('./connection');
// const camelize = require('camelize');
// const snakeize = require('snakeize');

const findAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const findProductById = async (idProduct) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [idProduct],
  );
  return result;
};

module.exports = {
  findAllProducts,
  findProductById,
};