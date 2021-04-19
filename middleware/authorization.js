const jwtLib = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        // 1) Destructuring the given data:
        const jwtToken = req.cookies.token;

        if (!jwtToken) {
            throw { message: "The user has not logged in." };
        }

        // 2) Checking the validity of the JWT provided:
        const payload = jwtLib.verify(jwtToken, process.env.jwtSecret);

        // The user has now been verified.
        req.user = payload.user;
        next();

    } catch (error) {
        /* This means either the user has not logged in, the access token has
        * expired, the access token has been removed, or the access token has
        * been tampered with. Either way, we will see if the refresh token
        * can keep the user logged in, if they are currently signed in.
        */

        const jwtRefreshToken = req.cookies.refToken;
        if (jwtRefreshToken) {
            try {
                const refreshPayload = jwtLib.verify(jwtRefreshToken, process.env.jwtRefresh);

                const newAccessToken = jwtLib.sign(
                    { user: refreshPayload.user },
                    process.env.jwtSecret,
                    { expiresIn: 60 }
                );

                // Expires in one minute:
                const accessTokenExpTime = 1000 * 60;

                res.cookie('token', newAccessToken, {
                    expires: new Date(Date.now() + accessTokenExpTime),
                    secure: true,
                    httpOnly: true,
                    sameSite: 'strict'
                });

                req.user = refreshPayload.user;
                next();

            } catch (error) {
                return res.status(403).json({ message: "Invalid access token." });
            }

        } else {
            return res.status(401).json({ message: "The user has not logged in." });
        }
    }
};
