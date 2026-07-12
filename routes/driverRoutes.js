const express = require('express');
const router = express.Router();

const { getMyBus, getMyTrips, startTrip, endTrip } = require('../controllers/driverController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.get('/my-bus', auth, role('driver'), getMyBus);
router.get('/my-trips', auth, role('driver'), getMyTrips);
router.put('/trip/start', auth, role('driver'), startTrip);
router.put('/trip/end', auth, role('driver'), endTrip);

module.exports = router;
