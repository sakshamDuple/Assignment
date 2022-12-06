const mongoose = require('mongoose');

const bikeBookingSchema = new mongoose.Schema({
    pickup_date: {
        type: String,
        required: true
    },
    dropoff_date: {
        type: String,
        required : true
    },
    rider_name: {
        type: String,
        required : true
    },
    rider_height: {
        type: String,
        required : true
    },
    frame_type: {
        type: String,
        required : true
    },
    collection_time: {
        type: String,
        required : true
    }
})

module.exports = BikeBookingModel = mongoose.model('Bike', bikeBookingSchema);