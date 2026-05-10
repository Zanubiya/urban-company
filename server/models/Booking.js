const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  serviceName: String,

  bookingDate: String,

  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", bookingSchema);