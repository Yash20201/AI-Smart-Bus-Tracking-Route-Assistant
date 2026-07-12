const express = require('express');
const router = express.Router();

const {
    createTrip,
    getTrips,
    getTripById,
    updateTripStatus,
    deleteTrip
} = require('../controllers/tripController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role('admin'), createTrip);
router.get('/', auth, getTrips);
router.get('/:id', auth, getTripById);
router.put('/:id/status', auth, role('admin', 'driver'), updateTripStatus);
router.delete('/:id', auth, role('admin'), deleteTrip);

module.exports = router;
