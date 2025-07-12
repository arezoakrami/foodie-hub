const express = require('express');
const router = express.Router();
const menuItemController = require('../controllers/menuItemController');

router.post('/:restaurantId/menu-items', menuItemController.createMenuItem);
router.get('/:restaurantId/menu-items', menuItemController.getMenuItems);
router.put('/menu-items/:id', menuItemController.updateMenuItem);
router.delete('/menu-items/:id', menuItemController.deleteMenuItem);
router.patch('/menu-items/:id/availability', menuItemController.updateAvailability);

module.exports = router;
