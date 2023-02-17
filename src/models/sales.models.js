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
  return result;
};

const findSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return result;
};

const deleteModelSale = async (id) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  return affectedRows;
};

const updateModelSale = async (quantity, productId, saleId) => {
  const [{ affectedRows }] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ? 
    WHERE product_id = ? AND sale_id = ?`,
    [quantity, productId, saleId],
  );
  return affectedRows;
};

module.exports = {
  updateModelSale,
  findSaleById,
  deleteModelSale,
  insertSaleProduct,
  insertSale,
  findAllSalesProducts,
  findSalesProductsById,
};