const mongoose = require('mongoose');

// Schema Setup
const eventsSchema = new mongoose.Schema({
    event: String,
    createdAt: {
        type: Date,
        default: new Date
    }
});

module.exports = mongoose.model('event', eventsSchema);