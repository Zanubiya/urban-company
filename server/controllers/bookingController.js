const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);

    await booking.save();

    res.json({
      message: "Booking Created",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customerId")
      .populate("vendorId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );

    res.json(booking);
  } catch (error) {
    res.status(500).json(error);
  }
};