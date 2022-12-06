const route = require("express").Router();
const {newBooking, getBookingData, updateBookingData, deleteBookingData} = require("../controller/bikebookingController")

route.post("/", newBooking);
route.get("/:bookingId", getBookingData);
route.put("/:bookingId", updateBookingData);
route.delete("/:bookingId", deleteBookingData);

module.exports = route;