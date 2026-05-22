const jwt = require("jsonwebtoken");



const protect = async (req, res, next) => {

    try {

        let token;

        // token check
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

        }


        // token missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }


        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // decoded user info req এ attach
        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            success: false,
            message: "Invalid token",
        });

    }

};




const adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Admin access only",
        });
    }

    next();

};



module.exports = {
    protect,
    adminOnly,
};