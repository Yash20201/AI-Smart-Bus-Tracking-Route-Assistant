const express = require('express');
const router = express.Router();
const { createBus, getBuses, assignDriverToBus, assignRouteToBus, deleteBus } = require('../controllers/busController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role('admin'), createBus);
router.get('/', auth, getBuses);
router.put('/assign-driver', auth, role('admin'), assignDriverToBus);
router.put('/assign-route', auth, role('admin'), assignRouteToBus);
router.delete('/:id', auth, role('admin'), deleteBus);

module.exports = router;
