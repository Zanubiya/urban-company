const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// ✅ CORS (ADD HERE - VERY IMPORTANT)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://urban-company-git-master-zanus-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Optional but helpful for preflight requests
app.options("*", cors());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

app.get("/", (req, res) => {
  res.send("API Running");
});

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});