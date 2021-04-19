const router = require("express").Router();
const pool = require("./../db");
const bcryptLib = require("bcrypt");
const jwtGenerator = require("./../utils/jwtGenerator");
const validInfo = require("./../middleware/validInfo")
const authorization = require("./../middleware/authorization");

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


        // 4) Entering the new user into the DB:
        const addUser = await pool.query("INSERT INTO users (user_name, user_email, user_pwd) VALUES ($1, $2, $3) RETURNING *",
            [userName, emailLowercase, bcryptPwd]
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
        res.clearCookie("refToken");
        res.clearCookie("token");
        res.status(200).json({ message: "Successfully logged out." });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
