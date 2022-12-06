const BikeModel = require("../model/bikeBooking")
const ObjectId = require("mongoose").Types.ObjectId;

const newBooking = async (req, res) => {
    try {
        if (req.body && Object.keys(req.body).length !== 0) {
            const { pickup_date, dropoff_date, rider_name, rider_height, frame_type, collection_time } = req.body
            const booking = new BikeModel({
                pickup_date,
                dropoff_date,
                rider_name,
                frame_type,
                rider_height,
                collection_time,
            })
            const bookingData = await booking.save();
            res.status(200).send({ data: bookingData, status: true, message: "success" })
        } else {
            res.status(201).send({ message: "Data not Found", status: false })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const getBookingData = async (req, res) => {
    try {
        if (req.params.bookingId) {
            const bookingId = ObjectId(req.params.bookingId)
            if (!bookingId) throw new Error('Booking Id not found')
            const bookingData = await BikeModel.findById(bookingId)
            if (bookingData && Object.keys(bookingData).length !== 0) {
                res.status(200).send({ data: bookingData, message: "success", status: true })
            } else {
                res.status(404).send({ message: "Booking details not found" })
            }
        } else {
            res.status(201).send({ message: "Booking Id not found", status: false })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateBookingData = async (req, res) => {
    try {
        if (req.params.bookingId) {
            const bookingId = ObjectId(req.params.bookingId)
            if (!bookingId) throw new Error('Booking Id not found')
            const bookingData = await BikeModel.findById(bookingId)
            bookingData.pickup_date = req.body.pickup_date || bookingData.pickup_date
            bookingData.dropoff_date = req.body.dropoff_date || bookingData.dropoff_date
            bookingData.rider_name = req.body.rider_name || bookingData.rider_name
            bookingData.rider_height = req.body.rider_height || bookingData.rider_height
            bookingData.frame_type = req.body.frame_type || bookingData.frame_type
            bookingData.collection_time = req.body.collection_time || bookingData.collection_time
            const updatedBooking = await BikeModel.findByIdAndUpdate(bookingId, bookingData)
            res.status(200).send({ bookingData: updatedBooking })
        } else {
            res.status(201).send({ message: "Booking Id not found", status: false })
        }
    } catch (error) {
        res.status(500).send({error})
    }
}

const deleteBookingData = async (req, res) => {
    try {
        if (req.params.bookingId) {
            const bookingId = ObjectId(req.params.bookingId)
            if (!bookingId) throw new Error('Booking Id not found')
            const bookingData = await BikeModel.findByIdAndDelete(bookingId)
            if (bookingData) {
                res.status(200).send({ message: "Booking details deleted successfully" })
            } else {
                res.status(404).send({ message: "Booking details not found" })
            }
        } else {
            res.status(201).send({ message: "Booking Id not found", status: false })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { newBooking, getBookingData, updateBookingData, deleteBookingData }
