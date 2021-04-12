const router = require("express").Router();
const pool = require("./../db");


/************************************** START: product_categories DB *****************************/
router.get("/categories", async(req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM product_categories;");

        res.json(allCategories.rows);

    } catch (error) {
        console.error(error.message);
    }
});
/************************************** END: product_categories DB *******************************/


module.exports = router;
