const express = require("express");

const router = express.Router();

const {
  createRoute,
  getRoutes
} = require("../controllers/routeController");

router.post("/", createRoute);
router.get("/", getRoutes);

module.exports = router;