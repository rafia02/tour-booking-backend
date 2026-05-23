// const express = require("express");
// const router = express.Router();

// const { createBooking } = require("../controllers/booking.controller");

// const { protect } = require("../middleware/auth.middleware");



// router.post("/:tourId", protect, createBooking);



// module.exports = router;



const express = require("express");

const router = express.Router();

const {
    createBooking,
    getMyBookings,
    getSingleBooking,
    cancelBooking,
    getAllBookings,
    updateBookingStatus,
} = require("../controllers/booking.controller");

const {
    protect,
    adminOnly,
} = require("../middleware/auth.middleware");



// USER ROUTES
router.post("/:tourId", protect, createBooking);

router.get("/my-bookings", protect, getMyBookings);

router.get("/:id", protect, getSingleBooking);

router.patch("/cancel/:id", protect, cancelBooking);



// ADMIN ROUTES
router.get("/", protect, adminOnly, getAllBookings);

router.patch(
    "/update-status/:id",
    protect,
    adminOnly,
    updateBookingStatus
);



module.exports = router;