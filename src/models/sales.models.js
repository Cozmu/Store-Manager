// const camelize = require('camelize');
const connection = require('./connection');

const findSalesProductsById = async (idSale) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS productId, sp.quantity
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?`,
    [idSale],
  );
  return result;
};

const findAllSalesProducts = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sa.date, sp.quantity 
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS sa
    ON sp.sale_id = sa.id`,
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
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity], 
  );
  // console.log(result);
  return result;
};

module.exports = {
  insertSaleProduct,
  insertSale,
  findAllSalesProducts,
  findSalesProductsById,
};