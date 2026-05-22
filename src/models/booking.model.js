const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tour",
            required: true,
        },

        pickupCity: {
            type: String,
            required: true,
        },

        guestCount: {
            type: Number,
            required: true,
        },

        chargedGuests: {
            type: Number,
        },

        transportFee: {
            type: Number,
            default: 0,
        },

        entranceTotal: {
            type: Number,
            default: 0,
        },

        totalPrice: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["pending", "confirmed", "cancelled"],
            default: "pending",
        },
        selectedDate: {
            type: Date,
            required: true,
        },

        preferredTime: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;