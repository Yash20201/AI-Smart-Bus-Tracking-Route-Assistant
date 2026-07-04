const BusLocation = require("../models/BusLocation");

exports.getLocation = async (req, res) => {

    const location = await BusLocation.find();

    res.json(location);
};