const Route = require('../models/Route');

exports.findRoutesByStop = async (stopName) => {
    return Route.find({ 'stops.type': new RegExp(stopName, 'i') });
};

exports.getRouteStops = async (routeId) => {
    const route = await Route.findById(routeId);

    if (!route) {
        return null;
    }

    return route.stops;
};

exports.addStopToRoute = async (routeId, stop) => {
    return Route.findByIdAndUpdate(
        routeId,
        { $push: { stops: stop } },
        { new: true }
    );
};
