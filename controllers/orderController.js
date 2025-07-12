const OrderModel = require('../models/orderModel');

// create order
async function createOrder(req, res) {
  try {
    const { customerId, restaurantId, items } = req.body;

    if (!customerId || !restaurantId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    const order = await OrderModel.createOrder(customerId, restaurantId, items);
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
}

// show all order
async function getAllOrders(req, res) {
  try {
    const { status } = req.query;
    const orders = await OrderModel.getAllOrders(status);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

async function getOrdersByCustomer(req, res) {
  try {
    const { customerId } = req.params;
    const orders = await OrderModel.getOrdersByCustomer(customerId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customer orders' });
  }
}

// update order
async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updated = await OrderModel.updateOrderStatus(id, status);
    if (!updated) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
}

// delete order
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const deleted = await OrderModel.deleteOrder(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
}

async function getPopularMenuItems(req, res) {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const items = await OrderModel.getPopularMenuItems(limit);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch popular menu items' });
  }
}

async function getOrdersByRestaurant(req, res) {
  try {
    const { id } = req.params;
    const orders = await OrderModel.getOrdersByRestaurant(id);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch restaurant orders' });
  }
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

