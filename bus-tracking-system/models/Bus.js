const mongoose = require('mongoose');

const busSchema = new mongoose.Schema(
    {
        busNumber: { 
            type: String, 
            required: true, 
            unique: true
        },
        busName: { 
            type: String, 
            required: true 
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        
        route:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
        },

        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        }
    },
    { 
        timestamps: true
    }
);


busLocationSchema = new mongoose.Schema(
    {
        busId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Bus",
    },

    latitude: number,
    longitude: number,

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bus', busSchema);
module.exports = mongoose.model('BusLocation', busLocationSchema);

