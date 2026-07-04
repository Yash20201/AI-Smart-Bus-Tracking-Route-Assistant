<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { getDashboard, getUsers, deleteUser } = require('../controllers/adminController');

router.get('/dashboard', auth, admin, getDashboard);
router.get('/users', auth, admin, getUsers);
router.delete('/users/:id', auth, admin, deleteUser);

module.exports = router;
=======
const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");

const {
    getDashboard
} = require("../controllers/adminController");

router.get(
    "/dashboard",
    auth,
    admin,
    getDashboard
);

module.exports = router;
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
