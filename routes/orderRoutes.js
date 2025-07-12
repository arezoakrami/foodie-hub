const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/customer/:customerId', orderController.getOrdersByCustomer);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);
router.get('/popular-menu-items', orderController.getPopularMenuItems);
router.get('/restaurant/:id/orders', orderController.getOrdersByRestaurant);

module.exports = router;
