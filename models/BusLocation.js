const mongoose = require('mongoose');

const busLocationSchema = new mongoose.Schema(
    {
        busId: {
            type: String,
        },

        latitude: Number,
        longitude: Number,

        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('BusLocation', busLocationSchema);
