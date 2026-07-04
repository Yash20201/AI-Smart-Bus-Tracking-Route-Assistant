const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { createBus, getBuses, assignDriverToBus, assignRouteToBus, deleteBus } = require('../controllers/busController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role('admin'), createBus);
router.get('/', auth, getBuses);
router.put('/assign-driver', auth, role('admin'), assignDriverToBus);
router.put('/assign-route', auth, role('admin'), assignRouteToBus);
router.delete('/:id', auth, role('admin'), deleteBus);

module.exports = router;
=======

const {createBus,getBuses,assignDriverToBus} = require('../controllers/busController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/',auth,role('admin'), createBus);
router.get('/',auth, getBuses);
router.put("/assign-driver",auth,role('admin'),assignDriverToBus);

module.exports = router;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
