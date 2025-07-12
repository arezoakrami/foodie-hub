const MenuItemModel = require('../models/menuItemModel');

// Adding
async function createMenuItem(req, res) {
  const { restaurantId } = req.params;
  const { name, description, price, isAvailable } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const newItem = await MenuItemModel.createMenuItem(
      restaurantId, name, description, price, isAvailable
    );
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// list of items
async function getMenuItems(req, res) {
  const { restaurantId } = req.params;

  try {
    const items = await MenuItemModel.getMenuItemsByRestaurant(restaurantId);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// editing
async function updateMenuItem(req, res) {
  const { id } = req.params;
  const { name, description, price, isAvailable } = req.body;

  try {
    const updated = await MenuItemModel.updateMenuItem(
      id, name, description, price, isAvailable
    );
    if (!updated) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// delete 
async function deleteMenuItem(req, res) {
  const { id } = req.params;

  try {
    const deleted = await MenuItemModel.deleteMenuItem(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
 
async function updateAvailability(req, res) {
  const { id } = req.params;
  const { isAvailable } = req.body;

  if (typeof isAvailable !== 'boolean') {
    return res.status(400).json({ error: 'isAvailable must be true or false' });
  }

  try {
    const updated = await MenuItemModel.updateMenuItemAvailability(id, isAvailable);
    if (!updated) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
  updateAvailability
};
