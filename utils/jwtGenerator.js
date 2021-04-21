const jwtLib = require("jsonwebtoken");
require("dotenv").config();
const pool = require("./../db");

// Generates the JWT access and refresh tokens:
async function jwtGenerator(res, user_id) {
    const payload = {
        user: user_id
    }

    // The cookie, storing the access token, has the same life time (one day)
    // as the refresh token because the auth system needs to check to see
    // if the given access token is valid even if it has expired.
    const accessTokenInCookieExpTime = 1000 * 60 * 60 * 24;
    
    const refreshToken = jwtLib.sign(payload, process.env.jwtRefresh, { expiresIn: "1d" });
    const token = jwtLib.sign(payload, process.env.jwtSecret, { expiresIn: 5 });

    // Placing the new access and refresh tokens in the DB:
    await pool.query("UPDATE users SET user_refresh_token = $1, user_access_token = $2 WHERE user_id = $3", [
        refreshToken, token, payload.user
    ]);

    return res.cookie('token', token, {
        expires: new Date(Date.now() + accessTokenInCookieExpTime),
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    });
}

module.exports = jwtGenerator;
