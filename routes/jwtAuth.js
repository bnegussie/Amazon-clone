const router = require("express").Router();
const pool = require("./../db");
const bcryptLib = require("bcrypt");
const jwtGenerator = require("./../utils/jwtGenerator");
const validInfo = require("./../middleware/validInfo")
const authorization = require("./../middleware/authorization");
const jwtLib = require("jsonwebtoken");
const atob = require("atob");

// Registeration route:
router.post("/create-account", validInfo, async(req, res) => {
    try {
        // 1) Destructuring given data:
        const { userName, email, pwd } = req.body;
        const emailLowercase = email.toLowerCase();

        // 2) Checking if the user already exists:
        const userExists = await pool.query("SELECT * FROM users WHERE user_email = $1", [emailLowercase]);

        if (userExists.rows.length > 0) {
            return res.status(401).json({ message: "A user with this email already exists." });
        }


        // 3) Encrypting the user's password:
        const saltRound = 10;
        const salt = await bcryptLib.genSalt(saltRound);
        const bcryptPwd = await bcryptLib.hash(pwd, salt);

        // Default:
        const sellerID = "";


        // 4) Entering the new user into the DB:
        const addUser = await pool.query("INSERT INTO users (user_name, user_email, user_pwd, seller_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [userName, emailLowercase, bcryptPwd, sellerID]
        );
        

        // 5) Generating the user's JWT and storing it in a cookie:
        await jwtGenerator(res, addUser.rows[0].user_id);


        res.status(200).json({ message: "Successfully created your account!" });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});


// Login route:
router.post("/sign-in", validInfo, async(req, res) => {
    try {
        // 1) Destructuring given data:
        const { email, pwd } = req.body;
        const emailLowercase = email.toLowerCase();


        // 2) Checking if this user exists:
        const checkUser = await pool.query("SELECT * FROM users WHERE user_email = $1", [emailLowercase]);

        if (checkUser.rows.length === 0) {
            return res.status(401).json({ message: "A user with this email does not exist." });
        }


        // 3) Decrypting password and making sure it matches what's in the DB:
        const validPwd = await bcryptLib.compare(pwd, checkUser.rows[0].user_pwd);

        if (!validPwd) {
            return res.status(401).json({ message: "Incorrect password." });
        }


        // 4) Generating a JWT access token for the user:
        await jwtGenerator( res, checkUser.rows[0].user_id );


        return res.status(200).json({ message: "Successful login!" });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get("/is-verified", authorization, async(req, res) => {
    try {
        res.status(200).json({ message: "This is an authorized user." });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

router.get("/log-out", async(req, res) => {
    try {
        // Clear both tokens from the user's account:
        const jwtToken = req.cookies.token;

        if (jwtToken) {
            // Checking the validity of the JWT provided so we can extract the user's id:
            const payload = jwtLib.verify(jwtToken, process.env.jwtSecret);
            const userId = payload.user;

            const tokenInDB = await pool.query(
                "SELECT user_access_token FROM users WHERE user_id = $1;", [
                    userId
            ]);

            const accessTokenInDB = tokenInDB.rows[0].user_access_token;

            if (jwtToken === accessTokenInDB) {
                const clear = "";
                await pool.query(
                    "UPDATE users SET user_access_token = $1, user_refresh_token = $2 WHERE user_id = $3", [
                        clear, clear, userId
                ]);
            }
        }

    } catch (error) {

        if (error.message === "jwt expired") {
            var userId = "";
            try {
                // Check if this access token is the same one that is in the DB:
                const exiredJWTToken = req.cookies.token;
                const expiredPayload = JSON.parse(atob(exiredJWTToken.split('.')[1]));
                userId = expiredPayload.user;

                const tokenInDB = await pool.query(
                    "SELECT user_access_token FROM users WHERE user_id = $1;", [
                        userId
                ]);

                const accessTokenInDB = tokenInDB.rows[0].user_access_token;

                if (exiredJWTToken === accessTokenInDB) {
                    const clear = "";
                    await pool.query(
                        "UPDATE users SET user_access_token = $1, user_refresh_token = $2 WHERE user_id = $3", [
                            clear, clear, userId
                    ]);
                }
                
            } catch (error) {
                // Clearing the cookie below:
            }
        }

    } finally {
        res.clearCookie("token");
        return res.status(200).json({ message: "Successfully logged out." });
    }
});

module.exports = router;
