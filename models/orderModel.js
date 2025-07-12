const db = require('../db');

// create
async function createOrder(customerId, restaurantId, items) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    const orderResult = await client.query(
      `INSERT INTO orders (customer_id, restaurant_id, status)
       VALUES ($1, $2, 'pending')
       RETURNING *`,
      [customerId, restaurantId]
    );
    const order = orderResult.rows[0];

    for (let item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, menu_item_id, quantity)
         VALUES ($1, $2, $3)`,
        [order.id, item.menu_item_id, item.quantity]
      );
    }

    await client.query('COMMIT');
    return order;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// showing orders
async function getAllOrders(status = null) {
  if (status) {
    const result = await db.query(
      `SELECT * FROM orders WHERE status = $1`,
      [status]
    );
    return result.rows;
  } else {
    const result = await db.query(`SELECT * FROM orders`);
    return result.rows;
  }
}

// showing the order of customer
async function getOrdersByCustomer(customerId) {
  const result = await db.query(
    `SELECT * FROM orders WHERE customer_id = $1`,
    [customerId]
  );
  return result.rows;
}

// changing the order
async function updateOrderStatus(id, status) {
  const result = await db.query(
    `UPDATE orders SET status = $1 WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return result.rows[0];
}

// delete the order
async function deleteOrder(id) {
  const result = await db.query(
    `DELETE FROM orders WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows[0];
}

async function getPopularMenuItems(limit = 5) {
  const result = await db.query(
    `
    SELECT mi.id, mi.name, SUM(oi.quantity) as total_sold
    FROM order_items oi
    JOIN menu_items mi ON oi.menu_item_id = mi.id
    GROUP BY mi.id, mi.name
    ORDER BY total_sold DESC
    LIMIT $1
    `,
    [limit]
  );
  return result.rows;
}

async function getOrdersByRestaurant(restaurantId) {
  const result = await db.query(
    `SELECT * FROM orders WHERE restaurant_id = $1 ORDER BY created_at DESC`,
    [restaurantId]
  );
  return result.rows;
}

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  updateOrderStatus,
  deleteOrder,
  getPopularMenuItems,
  getOrdersByRestaurant
};
