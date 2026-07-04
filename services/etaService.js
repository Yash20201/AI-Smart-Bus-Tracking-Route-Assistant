const BusLocation = require('../models/BusLocation');
const Bus = require('../models/Bus');

const AVERAGE_SPEED_KMH = 30;

function toRadians(deg) {
    return (deg * Math.PI) / 180;
}

function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
            Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

exports.calculateETA = async (busId) => {
    const location = await BusLocation.findOne({ busId });
    const bus = await Bus.findOne({ busNumber: busId }).populate('route');

    if (!location) {
        return { message: 'This bus is not currently sharing its location' };
    }

    if (!bus || !bus.route || bus.route.stops.length === 0) {
        return { message: 'Not enough data to calculate ETA' };
    }

    const nextStop = bus.route.stops[0];

    if (!nextStop.lat || !nextStop.lng) {
        return { message: 'Stop coordinates not available for ETA calculation' };
    }

    const distanceKm = getDistanceInKm(
        location.latitude,
        location.longitude,
        nextStop.lat,
        nextStop.lng
    );

    const etaMinutes = Math.round((distanceKm / AVERAGE_SPEED_KMH) * 60);

    return {
        busId,
        nextStop: nextStop.type || nextStop,
        distanceKm: distanceKm.toFixed(2),
        etaMinutes
    };
};
