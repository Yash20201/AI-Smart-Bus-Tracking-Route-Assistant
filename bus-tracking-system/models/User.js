const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,           
        required: true
    },
    email: { 
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,   
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'driver', 'passenger'],
        default: 'passenger'
    }
}, {
     timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User;