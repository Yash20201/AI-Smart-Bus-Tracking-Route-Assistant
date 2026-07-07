const express = require('express');
const router = express.Router();

const { getRouteSuggestion, getEtaPrediction } = require('../controllers/aiController');
const auth = require('../middleware/authMiddleware');

router.post('/suggest-route', auth, getRouteSuggestion);
router.get('/eta/:busId', auth, getEtaPrediction);

module.exports = router;
