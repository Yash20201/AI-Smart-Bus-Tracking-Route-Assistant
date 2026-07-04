const Route = require('../models/Route');
const etaService = require('./etaService');

function escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

exports.suggestBestRoute = async (startPoint, endPoint) => {
    const routes = await Route.find({
        startPoint: new RegExp(escapeRegex(startPoint), 'i'),
        endPoint: new RegExp(escapeRegex(endPoint), 'i')
    });

    if (routes.length === 0) {
        return {
            message: 'No direct route found between these points',
            suggestions: []
        };
    }

    const ranked = routes
        .map((route) => ({
            route,
            stopCount: route.stops.length
        }))
        .sort((a, b) => a.stopCount - b.stopCount);

    return {
        message: 'Best route found based on fewest stops',
        bestRoute: ranked[0].route,
        alternatives: ranked.slice(1).map((r) => r.route)
    };
};

exports.predictETA = async (busId) => {
    return etaService.calculateETA(busId);
};
