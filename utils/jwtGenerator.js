const jwtLib = require("jsonwebtoken");
require("dotenv").config();

// Generates the JWT access and refresh tokens:
function jwtGenerator(res, user_id) {
    const payload = {
        user: user_id
    }

    const token = jwtLib.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });

    const expTime = 1000 * 60 * 60;

    return res.cookie('token', token, {
        expires: new Date(Date.now() + expTime),
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
      });
}

module.exports = jwtGenerator;
