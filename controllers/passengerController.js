const Bus = require('../models/Bus');
const Route = require('../models/Route');
const BusLocation = require('../models/BusLocation');

exports.getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBusesOnRoute = async (req, res) => {
    try {
        const { routeId } = req.params;

        const buses = await Bus.find({ route: routeId, status: 'active' })
            .populate('driver', 'name')
            .populate('route');

        res.json(buses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.trackBus = async (req, res) => {
    try {
        const { busId } = req.params;

        const location = await BusLocation.findOne({ busId });

        if (!location) {
            return res.status(404).json({ message: 'Location not available for this bus' });
        }

        res.json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
