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
<<<<<<< HEAD
            type: { type: String },
=======
            type: String,
>>>>>>> e7aad6b869026515dbcb524cd2b323ac59588676
            lat: Number,
            lng: Number
        }]
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model('Route', routeSchema);
