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