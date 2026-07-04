const Bus = require('../models/Bus');

exports.createBus = async (req, res) => {
    try {
        const bus = await Bus.create(req.body);

        res.status(201).json({ bus });

    } catch (error) {
        res.status(500).json({ 
            message:  error.message });
    }
};

exports.getBuses = async (req, res) => {
    try {
        const buses = await Bus.find()
        .populate("driver")
        .populate("route");

        res.json( buses );

    } catch (error) {
        res.status(500).json({ 
            message: error.message });
    }
};

exports.assignDriverToBus = async (req, res) => {
<<<<<<< HEAD
    try {
        const { busId, driverId } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            {
                driver: driverId
            },
            {
                 new: true 
            }
        ).populate('driver', 'name email').populate('route');

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.assignRouteToBus = async (req, res) => {
    try {
        const { busId, routeId } = req.body;

        const bus = await Bus.findByIdAndUpdate(
            busId,
            { route: routeId },
            { new: true }
        ).populate('route').populate('driver', 'name');

        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        res.json(bus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.deleteBus = async (req, res) => {
    try {
        const bus = await Bus.findByIdAndDelete(req.params.id);
        if (!bus) return res.status(404).json({ message: 'Bus not found' });
        res.json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
=======
    const { busId, driverId } = req.body;

    const bus = await Bus.findByIdAndUpdate(
        busId,
        {
            driver: driverId
        },
        {
             new: true 
        }
    );

    res.json(bus);

};


>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
