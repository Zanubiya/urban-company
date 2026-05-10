const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// =========================
// CORS CONFIGURATION
// =========================

const allowedOrigins = [
  "http://localhost:5173",
  "https://urban-company-git-master-zanus-projects.vercel.app"
];
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

// =========================
// MIDDLEWARE
// =========================

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.send("API Running");
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});