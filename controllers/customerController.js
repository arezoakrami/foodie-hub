const CustomerModel = require('../models/customerModel');

// create new customer
async function createCustomer(req, res) {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const newCustomer = await CustomerModel.createCustomer(name, phone);
    res.status(201).json(newCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create customer' });
  }
}

// get all customers
async function getAllCustomers(req, res) {
  try {
    const customers = await CustomerModel.getAllCustomers();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
}

// update information of all customers
async function updateCustomer(req, res) {
  try {
    const { id } = req.params;
    const { name, phone } = req.body;

    const updated = await CustomerModel.updateCustomer(id, name, phone);
    if (!updated) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update customer' });
  }
}

// delete customers
async function deleteCustomer(req, res) {
  try {
    const { id } = req.params;

    const deleted = await CustomerModel.deleteCustomer(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ message: 'Customer deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
}

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
