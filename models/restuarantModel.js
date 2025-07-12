const db = require('../db');

async function getAllRestaurants(page = 1, limit = 10) {
  const offset = (page - 1) * limit;

  const result = await db.query(
    `SELECT * FROM restaurants ORDER BY id LIMIT $1 OFFSET $2`,
    [limit, offset]
  );
  return result.rows;
}
async function createRestaurant(name, address, phone) {
  const result = await db.query(
    `INSERT INTO restaurants (name, address, phone)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, address, phone]
  );
  return result.rows[0];
}

async function updateRestaurant(id, name, address, phone) {
  const result = await db.query(
    `UPDATE restaurants
     SET name = $1,
         address = $2,
         phone = $3
     WHERE id = $4
     RETURNING *`,
    [name, address, phone, id]
  );
  return result.rows[0];
}
async function deleteRestaurant(id) {
  const result = await db.query(
    `DELETE FROM restaurants WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0]; 
}
module.exports = {
  getAllRestaurants,
  createRestaurant,
   updateRestaurant,
  deleteRestaurant
};