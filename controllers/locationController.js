const BusLocation = require("../models/BusLocation");

exports.getLocation = async (req, res) => {

<<<<<<< HEAD
    const location = await BusLocation.find();
=======
    const location = await BusLocation.find().populate("busId");
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676

    res.json(location);
};