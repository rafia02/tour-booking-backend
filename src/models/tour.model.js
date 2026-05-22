const mongoose = require("mongoose");

const pricingSchema = new mongoose.Schema(
    {
        city: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            default: 0,
        },
    },
    { _id: false }
);

const tourSchema = new mongoose.Schema(
    {
        // ================= BASIC INFO =================
        title: { type: String, required: true, trim: true },

        category: { type: String, required: true },

        durationHours: { type: Number, required: true },

        city: { type: String },

        parish: { type: String },



        // ================= PRICING =================
        pricing: {

            pricingType: {
                type: String,
                enum: ["dynamic", "fixed"],
                default: "dynamic",
            },

            transportPricing: [pricingSchema],

            entranceFeePerPerson: {
                type: Number,
                default: 0,
            },

            minGuestsCharged: {
                type: Number,
                default: 1,
            },

            oddNumberPricing: {
                type: Boolean,
                default: false,
            },

            fixedPricing: {

                adultPrice: {
                    type: Number,
                    default: 0,
                },

                childPrice: {
                    type: Number,
                    default: 0,
                },

            },

        },



        // ================= CONTENT =================
        overview: { type: String },

        itinerary: { type: String },

        whatsIncluded: { type: String },

        accessibilityNotes: { type: String },

        cancellationPolicy: {
            type: String,
            default: "Free cancellation up to 24 hours before the tour",
        },



        // ================= MEDIA =================
        images: [{ type: String }],



        // ================= SETTINGS =================
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },

        featured: {
            type: Boolean,
            default: false,
        },

        pickupIncluded: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;