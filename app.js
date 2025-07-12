const express = require('express');
require('dotenv').config();
const app = express();

app.use(express.json());

const restaurantRoutes = require('./routes/restaurantRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customerRoutes = require('./routes/customerRoutes');

app.use('/restaurants', restaurantRoutes);
app.use('/restaurants', menuItemRoutes);
app.use('/orders', orderRoutes);
app.use('/customers', customerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
