<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const { createRoute, getRoutes, deleteRoute } = require('../controllers/routeController');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');

router.post('/', auth, role('admin'), createRoute);
router.get('/', auth, getRoutes);
router.delete('/:id', auth, role('admin'), deleteRoute);

module.exports = router;
=======
const express = require("express");

const router = express.Router();

const {
  createRoute,
  getRoutes
} = require("../controllers/routeController");

router.post("/", createRoute);
router.get("/", getRoutes);

module.exports = router;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
