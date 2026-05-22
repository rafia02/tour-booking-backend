const Tour = require("../models/tour.model");



// const createTour = async (req, res) => {

//     try {

//         const {
//             title,
//             description,
//             location,
//             price,
//             duration,
//             maxGroupSize,
//             image,
//             featured,
//         } = req.body;



//         const tour = await Tour.create({
//             title,
//             description,
//             location,
//             price,
//             duration,
//             maxGroupSize,
//             image,
//             featured,
//             createdBy: req.user.id,
//         });



//         res.status(201).json({
//             success: true,
//             message: "Tour created successfully",
//             tour,
//         });

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message,
//         });

//     }

// };


const createTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);

        res.status(201).json({
            success: true,
            message: "Tour created successfully",
            tour,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllTours = async (req, res) => {

    try {

        const tours = await Tour.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tours.length,
            tours,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


const getSingleTour = async (req, res) => {

    try {

        const tour = await Tour.findById(req.params.id);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }

        res.status(200).json({
            success: true,
            tour,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};



const calculateTourPrice = async (req, res) => {

    try {

        const { tourId } = req.params;

        const { pickupCity, guestCount } = req.body;

        // find tour
        const tour = await Tour.findById(tourId);

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }

        // find transport pricing
        const pricing = tour.pricing.transportPricing.find(
            (item) =>
                item.city.toLowerCase() === pickupCity.toLowerCase()
        );

        const transportFee = pricing ? pricing.price : 0;

        // entrance fee logic
        let chargedGuests = guestCount;

        if (tour.pricing.oddNumberPricing && guestCount % 2 === 0) {
            chargedGuests = guestCount - 1;
        }

        const entranceTotal =
            chargedGuests * tour.pricing.entranceFeePerPerson;

        // final total
        const totalPrice =
            transportFee + entranceTotal;

        res.status(200).json({
            success: true,
            calculation: {
                pickupCity,
                guestCount,
                chargedGuests,
                transportFee,
                entranceFeePerPerson: tour.pricing.entranceFeePerPerson,
                entranceTotal,
                totalPrice,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


module.exports = {
    createTour,
    getAllTours,
    getSingleTour,
    calculateTourPrice,
};