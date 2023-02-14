const connection = require('./connection');
// const camelize = require('camelize');

const insertSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales () VALUE ()',
  );
  return insertId;
};

module.exports = {
  insertSale,
};