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
exports.deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);
        if (!route) return res.status(404).json({ message: 'Route not found' });
        res.json({ message: 'Route deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
