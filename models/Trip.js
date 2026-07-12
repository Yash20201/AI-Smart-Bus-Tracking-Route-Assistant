const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
    {
        bus: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
            required: true
        },

        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            required: true
        },

        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        startTime: {
            type: Date
        },

        endTime: {
            type: Date
        },

        status: {
            type: String,
            enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
            default: 'scheduled'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Trip', tripSchema);
