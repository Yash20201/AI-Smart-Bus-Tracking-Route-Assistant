const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate('bus')
            .populate('route')
            .populate('driver', 'name email');

        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
            .populate('bus')
            .populate('route')
            .populate('driver', 'name email');

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTripStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { status },
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

exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);

        if (!trip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
