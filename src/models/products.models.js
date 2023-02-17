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

const insertProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [name],
  );
  return insertId;
};

const updateModelProtuct = async (id, name) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.products
    SET name = ? WHERE id = ?`,
    [name, id],
  );
  // console.log(affectedRows);
  return affectedRows;
};

module.exports = {
  insertProduct,
  updateModelProtuct,
  findAllProducts,
  findProductById,
};