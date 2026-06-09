const mongoose = require('mongoose');

const flightSchema = mongoose.Schema({
    flightNumber:{type: String, required: true, unique: true},
    destination:{type: String, required: true},
    departureTime:{type: String, required: true},
    status:{type: String, default: 'Scheduled'}
});

module.exports = mongoose.model('Flight', flightSchema);