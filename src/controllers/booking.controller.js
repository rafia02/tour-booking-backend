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



module.exports = {
    createBooking,
};