const router = require("express").Router();
const pool = require("./../db");
const authorization = require("../middleware/authorization");


/************************************** START: users DB ******************************************/
router.get("/user-name", authorization, async(req, res) => {
    try {
        const userId = req.user;
        
        const userName = await pool.query("SELECT user_name FROM users WHERE user_id = $1", 
            [userId]
        );

        res.status(200).json( userName.rows[0] );

    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});
/************************************** END: users DB ********************************************/

module.exports = router;
