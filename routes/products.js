const router = require("express").Router();
const pool = require("./../db");
require("dotenv").config();
const mkdirp = require('mkdirp');
const crypto = require("crypto");
const fs = require('fs');
const authorization = require("./../middleware/authorization");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: async function(req, files, cb) {
        const newImgPath = `${process.env.uploadPath}/${Date.now()}/${crypto.randomBytes(20).toString('hex')}`;
        await mkdirp( newImgPath );
        cb(null, newImgPath);
        
    },
    filename: function(req, files, cb) {
        cb(null, files.originalname);
    }
});

const fileFilter = function(req, files, cb) {
    if (files.mimetype === "image/jpeg" || files.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb("Only JPEG and PNG file types are accepted.", false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: parseInt(process.env.imgSizeLimit, 10)
    },
    fileFilter: fileFilter
});


/************************************** START: product_categories DB *****************************/
router.get("/categories", async(req, res) => {
    try {
        const allCategories = await pool.query("SELECT * FROM product_categories;");

        return res.status(200).json(allCategories.rows);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/************************************** END: product_categories DB *******************************/
/************************************** START: products DB ***************************************/
router.post("/listing", authorization, upload.array('productImages', 5), async(req, res) => {
    try {
        const userID = req.user;

        const {sellerID, pBrandName, pTitle, pDesc, pPrice, selectedProductCategory, pAvailableQuantity} = req.body;


        // Default:
        const currencySymbol = "$";
        const listingCreatedDate = new Date();

        const filePath = Array(5).fill("");
        const publicURL = Array(5).fill("");

        req.files.forEach(function(file, i) {
            let fileArray = file.path.split("\\");
            const publicArray = fileArray.slice(10);

            // Building up path:
            const purifiedPath = fileArray.join("/");
            const publicPath = "http://localhost:5000/" + publicArray.join("/");
            
            filePath[i] = purifiedPath;
            publicURL[i] = publicPath;
        });

        // Updating the user's sellerID:
        const updateSellerID = await pool.query("UPDATE users SET seller_id = $1 WHERE user_id = $2",
            [sellerID, userID]
        );

        // Storing the new product listing in the DB:
        const newListing = await pool.query("INSERT INTO products (user_id, seller_id, p_brand_name, p_title, p_desc, p_price, p_price_currency_symbol, p_category, p_available_quantities, p_photo_1_path, p_photo_1_public_path, p_photo_2_path, p_photo_2_public_path, p_photo_3_path, p_photo_3_public_path, p_photo_4_path, p_photo_4_public_path, p_photo_5_path, p_photo_5_public_path, p_listing_created_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *",
            [userID, sellerID, pBrandName, pTitle, pDesc, pPrice, currencySymbol, selectedProductCategory, pAvailableQuantity, filePath[0], publicURL[0], filePath[1], publicURL[1], filePath[2], publicURL[2], filePath[3], publicURL[3], filePath[4], publicURL[4], listingCreatedDate]
        );


        res.status(200).json({ message: "You have successfully created a new product listing." });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Getting a product listing for the product owner:
router.get("/listing/:id", authorization, async(req, res) => {
    try {
        const userID = req.user;
        const { id } = req.params;

        const product = await pool.query("SELECT p_id, seller_id, p_brand_name, p_title, p_desc, p_price, p_price_currency_symbol, p_category, p_available_quantities, p_photo_1_public_path, p_photo_2_public_path, p_photo_3_public_path, p_photo_4_public_path, p_photo_5_public_path FROM products WHERE p_id = $1 AND user_id = $2;",
            [id, userID]
        );

        if (product.rows.length === 0) {
            return res.status(401).json({ message: "No matching product available." });
        }
        
        res.status(200).json( product.rows[0] );

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Allowing only the product owner to remove the product from the Amazon-clone Market:
router.delete("/listing/:id", authorization, async(req, res) => {
    try {
        const userID = req.user;
        const { id } = req.params;

        const photos = await pool.query("SELECT p_photo_1_path, p_photo_2_path, p_photo_3_path, p_photo_4_path, p_photo_5_path FROM products WHERE p_id = $1 AND user_id = $2",
            [id, userID]
        );

        if (photos.rows.length === 0) {
            return res.status(403).json("Unauthorized to perform this deletion.");
        }

        const remove = await pool.query("DELETE FROM products WHERE p_id = $1 AND user_id = $2 RETURNING *",
            [id, userID]
        );


        // Deleting the product photos from the server:
        for (const [key, value] of Object.entries( photos.rows[0] )) {
            if (value !== "") {
                // Curating the directory path, where the photo resides:
                let dirArray = value.split("/");
                let dirArrayToBeDeleted = dirArray.slice(0, 11);
                const dirToBeDeleted = dirArrayToBeDeleted.join("/");


                // Deleting the directory, where the product photo resides, recursively:
                fs.rmdirSync(dirToBeDeleted, { recursive: true });
            }
        }
        

        res.status(200).json({ message: "The product listing has been successfully deleted." });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/************************************** END: products DB *****************************************/


module.exports = router;
