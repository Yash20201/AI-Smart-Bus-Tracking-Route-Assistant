const aiService = require('../services/aiService');

exports.getRouteSuggestion = async (req, res) => {
    try {
        const { startPoint, endPoint } = req.body;

        const suggestion = await aiService.suggestBestRoute(startPoint, endPoint);

        res.json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEtaPrediction = async (req, res) => {
    try {
        const { busId } = req.params;

        const eta = await aiService.predictETA(busId);

        res.json(eta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
