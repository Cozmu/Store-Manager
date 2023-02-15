const connection = require('./connection');
// const camelize = require('camelize');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  return insertId;
};

const insertSaleProduct = async (saleId, productId, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity], 
  );
  return result;
};

module.exports = {
  insertSaleProduct,
  insertSale,
};