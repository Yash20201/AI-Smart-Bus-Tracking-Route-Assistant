const User = require("../models/User");
const Bus = require("../models/Bus");
const Route = require("../models/Route");

exports.getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();

        const totalDrivers = await User.countDocuments({
            role: "driver"
        });

        const totalPassengers = await User.countDocuments({
            role: "passenger"
        });

        const totalAdmins = await User.countDocuments({
            role: "admin"
        });

        const totalBuses = await Bus.countDocuments();

        const activeBuses = await Bus.countDocuments({
            status: "active"
        });

        const totalRoutes = await Route.countDocuments();

        res.status(200).json({

            success: true,

            statistics: {

                totalUsers,
                totalDrivers,
                totalPassengers,
                totalAdmins,

                totalBuses,
                activeBuses,

                totalRoutes

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }
};