const jwtLib = require("jsonwebtoken");
require("dotenv").config();

// Generates the JWT access and refresh tokens:
function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    return jwtLib.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
