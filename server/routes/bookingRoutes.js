const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  updateStatus,
} = require("../controllers/bookingController");

router.post("/", createBooking);

router.get("/", getBookings);

router.put("/:id", updateStatus);

module.exports = router;