const connection = require('./connection');
// const camelize = require('camelize');

const findSaleById = async (idSale) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StorageManager.sales WHERE id = ?',
    [idSale],
  );
  return result;
}; 

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity], 
  );
  return result;
};

module.exports = {
  insertSaleProduct,
  findSaleById,
  insertSale,
};