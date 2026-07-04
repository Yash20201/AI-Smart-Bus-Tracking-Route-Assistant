const express = require('express');
const router = express.Router();
const { createRoute, getRoutes, deleteRoute } = require('../controllers/routeController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role('admin'), createRoute);
router.get('/', auth, getRoutes);
router.delete('/:id', auth, role('admin'), deleteRoute);

module.exports = router;
