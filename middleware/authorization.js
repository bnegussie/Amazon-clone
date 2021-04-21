const jwtLib = require("jsonwebtoken");
require("dotenv").config();
const atob = require("atob");
const pool = require("../db");

module.exports = async (req, res, next) => {
    
    try {
        // 1) Destructuring the given data:
        const jwtToken = req.cookies.token;

        if (!jwtToken) {
            return res.status(401).json({ message: "The user has not logged in." });
        }

        // 2) Checking the validity of the JWT provided:
        const payload = jwtLib.verify(jwtToken, process.env.jwtSecret);

        // 3) The user has now been verified.
        req.user = payload.user;
        next();

    } catch (error) {
        /* This means either the user's access token has expired or the access 
         * token has been tampered with. Therefore, more accessment will be done on the 
         * access token and if it is a valid token, which has just expired,
         * we will try to get the refresh token to keep the user logged in,
         * if the refresh token has not already expired.
         */

        if (error.message === "jwt expired") {
            var userId = "";
            var clearUserTokensFromDB = true;
            try {
                // Check if this access token is the same one that is in the DB:
                const exiredJWTToken = req.cookies.token;
                const expiredPayload = JSON.parse(atob(exiredJWTToken.split('.')[1]));
                userId = expiredPayload.user;

                const tokensInDB = await pool.query(
                    "SELECT user_access_token, user_refresh_token FROM users WHERE user_id = $1;", [
                        userId
                ]);

                const accessTokenInDB = tokensInDB.rows[0].user_access_token;

                if (exiredJWTToken === accessTokenInDB) {
                    // This is the user's access token.
                    // Starting the process of creating a new access token:

                    const jwtRefreshTokenInDB = tokensInDB.rows[0].user_refresh_token;
                    
                    // Making sure the refresh token has not exired:
                    const refreshPayload = jwtLib.verify(jwtRefreshTokenInDB, process.env.jwtRefresh);

                    if (userId !== refreshPayload.user) {
                        clearUserTokensFromDB = false;
                        throw "This is not a valid user.";
                    }

                    const newAccessToken = jwtLib.sign(
                        { user: userId },
                        process.env.jwtSecret,
                        { expiresIn: 5 }
                    );

                    await pool.query("UPDATE users SET user_access_token = $1 WHERE user_id = $2", [
                        newAccessToken, userId
                    ]);

                    // The token exires within a minute, but the cooke doesn't
                    // exire for a whole day.
                    const accessTokenInCookieExpTime = 1000 * 60 * 60 * 24;

                    res.cookie('token', newAccessToken, {
                        expires: new Date(Date.now() + accessTokenInCookieExpTime),
                        secure: true,
                        httpOnly: true,
                        sameSite: 'strict'
                    });

                    req.user = refreshPayload.user;
                    next();

                } else {
                    throw { message: "Invalid access token." };
                }

            } catch (error) {
                
                if (clearUserTokensFromDB) {
                    try {
                        /* The refresh token has expired or someone might be trying to hack a
                         * user's account so we will kick all of the users off so only the
                         * account user can use their valid credentials and log back in.
                         */
                        const clear = "";
                        await pool.query(
                            "UPDATE users SET user_access_token = $1, user_refresh_token = $2 WHERE user_id = $3", [
                                clear, clear, userId
                        ]);

                    } catch (error) {
                        // The code below simply needs to be run, regardless of a DB issue.
                    }
                }

                // The refresh token has expired or the access token has been tampered with.
                res.clearCookie("token");
                return res.status(403).json({ message: "Invalid tokens." });
            }

        } else {
            // The access token has been tampered with.
            res.clearCookie("token");
            return res.status(403).json({ message: "Invalid access token." });
        }

    }
};
