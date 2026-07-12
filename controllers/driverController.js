const Bus = require('../models/Bus');
const Trip = require('../models/Trip');

exports.getMyBus = async (req, res) => {
    try {
        const bus = await Bus.findOne({ driver: req.user.id }).populate('route');

        if (!bus) {
            return res.status(404).json({ message: 'No bus assigned to this driver' });
        }

        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyTrips = async (req, res) => {
    try {
        const trips = await Trip.find({ driver: req.user.id })
            .populate('bus')
            .populate('route');

        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.startTrip = async (req, res) => {
    try {
        const { tripId } = req.body;

        const trip = await Trip.findOneAndUpdate(
            { _id: tripId, driver: req.user.id },
            { status: 'ongoing', startTime: Date.now() },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.endTrip = async (req, res) => {
    try {
        const { tripId } = req.body;

        const trip = await Trip.findOneAndUpdate(
            { _id: tripId, driver: req.user.id },
            { status: 'completed', endTime: Date.now() },
            { new: true }
        );

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
