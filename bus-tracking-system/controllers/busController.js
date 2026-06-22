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


