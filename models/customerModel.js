const db = require('../db');

// create new customers
async function createCustomer(name, phone) {
  const result = await db.query(
    `INSERT INTO customers (name, phone)
     VALUES ($1, $2)
     RETURNING *`,
    [name, phone]
  );
  return result.rows[0];
}

// get customers
async function getAllCustomers() {
  const result = await db.query(`SELECT * FROM customers`);
  return result.rows;
}

// update information of customers
async function updateCustomer(id, name, phone) {
  const result = await db.query(
    `UPDATE customers SET name = $1, phone = $2
     WHERE id = $3
     RETURNING *`,
    [name, phone, id]
  );
  return result.rows[0];
}

// delete customers
async function deleteCustomer(id) {
  const result = await db.query(
    `DELETE FROM customers WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
}

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
