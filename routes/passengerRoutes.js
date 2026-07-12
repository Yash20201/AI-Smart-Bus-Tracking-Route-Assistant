const express = require('express');
const router = express.Router();

const { getAllRoutes, getBusesOnRoute, trackBus } = require('../controllers/passengerController');
const auth = require('../middleware/authMiddleware');

router.get('/routes', auth, getAllRoutes);
router.get('/routes/:routeId/buses', auth, getBusesOnRoute);
router.get('/track/:busId', auth, trackBus);

module.exports = router;
