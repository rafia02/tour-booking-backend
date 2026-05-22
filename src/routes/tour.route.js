const express = require("express");

const router = express.Router();

const {
    createTour,
    getAllTours,
    getSingleTour,
    calculateTourPrice,
} = require("../controllers/tour.controller");

const {
    protect,
    adminOnly,
} = require("../middleware/auth.middleware");



// CREATE TOUR (ADMIN)
router.post(
    "/create",
    protect,
    adminOnly,
    createTour
);


// GET ALL TOURS
router.get("/", getAllTours);


// GET SINGLE TOUR
router.get("/:id", getSingleTour);



router.post(
    "/calculate-price/:tourId",
    calculateTourPrice
);



module.exports = router;