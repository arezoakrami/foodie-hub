const RestaurantModel = require('../models/restaurantModel');

async function getRestaurants(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const restaurants = await RestaurantModel.getAllRestaurants(page, limit);
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function createRestaurant(req, res) {
  try {
    const { name, address, phone } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newRestaurant = await RestaurantModel.createRestaurant(name, address, phone);
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function updateRestaurant(req, res) {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    const updated = await RestaurantModel.updateRestaurant(id, name, address, phone);
    if (!updated) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;

    const deleted = await RestaurantModel.deleteRestaurant(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
module.exports = {
  getRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
};