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
<<<<<<< HEAD
};

exports.getUsers = async (req, res) => {
    try {
        const { role } = req.query;

        const filter = role ? { role } : {};

        const users = await User.find(filter).select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
=======
};
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
