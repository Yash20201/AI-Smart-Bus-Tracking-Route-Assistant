const Route = require("../models/Route");

exports.createRoute = async (req, res) => {

  try {

    const route = await Route.create(req.body);

    res.status(201).json(route);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.getRoutes = async (req, res) => {

  try {

    const routes = await Route.find();

    res.json(routes);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};