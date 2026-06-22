const express = require('express');
const router = express.Router();

const {createBus,getBuses,assignDriverToBus} = require('../controllers/busController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/',auth,role('admin'), createBus);
router.get('/',auth, getBuses);
router.put("/assign-driver",auth,role('admin'),assignDriverToBus);

module.exports = router;