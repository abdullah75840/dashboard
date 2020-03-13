const mongoose = require('mongoose');

// Schema Setup
const seatsSchema = new mongoose.Schema({
    guestname: String,
    seatnumber: Number,
    createdAt: {
        type: Date,
        default: new Date
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'event'
    }
});

module.exports = mongoose.model('seat', seatsSchema);