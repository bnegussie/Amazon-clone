const jwtLib = require("jsonwebtoken");
require("dotenv").config();

// Generates the JWT access and refresh tokens:
function jwtGenerator(res, user_id) {
    const payload = {
        user: user_id
    }

    // Expires in one day:
    const refreshTokenExpTime = 1000 * 60 * 60 * 24;
    // Expires in one minute:
    const accessTokenExpTime = 1000 * 60;
    
    const refreshToken = jwtLib.sign(payload, process.env.jwtRefresh, { expiresIn: "1d" });
    const token = jwtLib.sign(payload, process.env.jwtSecret, { expiresIn: 60 });

    res.cookie('refToken', refreshToken, {
        expires: new Date(Date.now() + refreshTokenExpTime),
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });

    res.cookie('token', token, {
        expires: new Date(Date.now() + accessTokenExpTime),
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
    
    return
}

module.exports = jwtGenerator;
