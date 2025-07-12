const db = require('../db');

// Adding item
async function createMenuItem(restaurantId, name, description, price, isAvailable = true) {
  const result = await db.query(
    `INSERT INTO menu_items (restaurant_id, name, description, price, is_available)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [restaurantId, name, description, price, isAvailable]
  );
  return result.rows[0];
}

// geting resturant item
async function getMenuItemsByRestaurant(restaurantId) {
  const result = await db.query(
    `SELECT * FROM menu_items WHERE restaurant_id = $1`,
    [restaurantId]
  );
  return result.rows;
}

// edit Item
async function updateMenuItem(id, name, description, price, isAvailable) {
  const result = await db.query(
    `UPDATE menu_items
     SET name = $1,
         description = $2,
         price = $3,
         is_available = $4
     WHERE id = $5
     RETURNING *`,
    [name, description, price, isAvailable, id]
  );
  return result.rows[0];
}

// delete item
async function deleteMenuItem(id) {
  const result = await db.query(
    `DELETE FROM menu_items WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function updateMenuItemAvailability(id, isAvailable) {
  const result = await db.query(
    `UPDATE menu_items
     SET is_available = $1
     WHERE id = $2
     RETURNING *`,
    [isAvailable, id]
  );
  return result.rows[0];
}

module.exports = {
  createMenuItem,
  getMenuItemsByRestaurant,
  updateMenuItem,
   deleteMenuItem,
  updateMenuItemAvailability
};
