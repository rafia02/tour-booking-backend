const Booking = require("../models/booking.model");
const Tour = require("../models/tour.model");



const createBooking = async (req, res) => {

    try {

        const { tourId } = req.params;

        const {
            pickupCity,
            guestCount,
            selectedDate,
            preferredTime,
        } = req.body;



        const tour = await Tour.findById(tourId);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }



        // transport pricing
        const pricing = tour.pricing.transportPricing.find(
            (item) =>
                item.city.toLowerCase() === pickupCity.toLowerCase()
        );



        const transportFee = pricing ? pricing.price : 0;



        // odd guest logic
        let chargedGuests = guestCount;

        if (tour.pricing.oddNumberPricing && guestCount % 2 === 0) {
            chargedGuests = guestCount - 1;
        }



        const entranceTotal =
            chargedGuests * tour.pricing.entranceFeePerPerson;



        const totalPrice =
            transportFee + entranceTotal;



        // 🔥 CREATE BOOKING (UPDATED)
        const booking = await Booking.create({
            user: req.user.id,
            tour: tourId,

            pickupCity,
            guestCount,

            // ✅ NEW ADDED FIELDS
            selectedDate,
            preferredTime,

            chargedGuests,
            transportFee,
            entranceTotal,
            totalPrice,
        });



        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const getMyBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user.id,
        })
            .populate("tour")
            .sort({ createdAt: -1 });



        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};




const getSingleBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id)
            .populate("tour")
            .populate("user", "name email");



        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }



        res.status(200).json({
            success: true,
            booking,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const cancelBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }



        // only owner can cancel
        if (booking.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }



        booking.status = "cancelled";

        await booking.save();



        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


const getAllBookings = async (req, res) => {

    try {

        const bookings = await Booking.find()
            .populate("tour")
            .populate("user", "name email")
            .sort({ createdAt: -1 });



        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const updateBookingStatus = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }



        booking.status = req.body.status;

        await booking.save();



        res.status(200).json({
            success: true,
            message: "Booking status updated",
            booking,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


module.exports = {
    createBooking,
    getMyBookings,
    getSingleBooking,
    cancelBooking,
    getAllBookings,
    updateBookingStatus,
};