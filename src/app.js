const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.route");
const tourRoutes = require("./routes/tour.route");
const bookingRoutes = require("./routes/booking.route");

const app = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));



// ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tours", tourRoutes);
app.use("/api/v1/bookings", bookingRoutes);



// TEST ROUTE
app.get("/", (req, res) => {
    res.send("Tour Booking Server Running...");
});


module.exports = app;