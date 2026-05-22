const {
    protect,
    adminOnly,
} = require("../middleware/auth.middleware");

const express = require("express");

const router = express.Router();

const { registerUser, loginUser, getMe } = require("../controllers/auth.controller");



// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

router.get("/me", protect, getMe);

router.get(
    "/admin-dashboard",
    protect,
    adminOnly,
    (req, res) => {

        res.status(200).json({
            success: true,
            message: "Welcome Admin",
        });

    }
);


module.exports = router;