const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema(
    {
        routeNumber: { 
            type: String, 
            required: true,
        },

        startPoint: { 
            type: String, 
            required: true 
        },

        endPoint: { 
            type: String, 
            required: true 
        },

        stops: [{
            type: String,
            lat: Number,
            lng: Number
        }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Route', routeSchema);
