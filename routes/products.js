const router = require("express").Router();
const pool = require("./../db");


/************************************** START: product_categories DB *****************************/
router.get("/categories", async(req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM product_categories;");

        res.status(200).json(allCategories.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/************************************** END: product_categories DB *******************************/


module.exports = router;
