const jwtLib = require("jsonwebtoken");
require("dotenv").config();



module.exports = async(req, res, next) => {
    try {
        // 1) Destructuring the given data:
        const jwtToken = req.cookies.token;

        if (!jwtToken) {
            return res.status(401).json({ message: "The user has not logged in." });
        }

        // 2) Checking the validity of the JWT provided:
        const payload = jwtLib.verify(jwtToken, process.env.jwtSecret);

        // The user has now been verified.
        req.user = payload.user;
        next();

    } catch (error) {
        return res.status(403).json({ message: "Invalid access token." });
    }
}
