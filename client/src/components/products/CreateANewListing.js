import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";

// Components:
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";

function CreateANewListing({ isAuth, isAuthenticated }) {
    const [sellerID, setSellerID] = useState("");
    const [pTitle, setPTitle] = useState("");
    const [pDesc, setPDesc] = useState("");
    const [pPrice, setPPrice] = useState(0.00);
    const [pAvailableQuantity, setPAvailableQuantity] = useState(0);

    const [allProductCategories, setAllProductCategories] = useState([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState("");


    function createANewListing(e) {
        e.preventDefault();

        try {
        } catch (error) {
            toast.error(error.message);
        }
    }

    function setDropDownCategoriesOption(e) {
        if (e) {
            setSelectedProductCategory( e.label );
            
        } else {
            setSelectedProductCategory("");
        }
    }

    useEffect(() => {
        isAuth();
    }, [isAuth]);

    // Capturing the categories for the products in the Amazon store:
    // Used for the drop-down categories option.
    useEffect(() => {
        getCategories();

        async function getCategories() {
            try {
                const response = await fetch("http://localhost:5000/api/products/categories");

                const productCategories = await response.json();

                productCategories.forEach(function(currCategory, index) {
                    allProductCategories.push({
                        "label": `${currCategory.c_name}`,
                        "value": `${currCategory.table_name}`
                    })
                });

            } catch (error) {
                console.error(error.message);
            }
        }

        return () => {
            setAllProductCategories([]);
        }

    }, [allProductCategories]);

    // Getting the user's seller ID:
    useEffect(() => {
        getSellerID();

        async function getSellerID() {
            try {
                const response = await fetch("http://localhost:5000/api/users/seller-id", {
                    method: "GET",
                    credentials: "include",
                });
                const id = await response.json();
                setSellerID( id );

            } catch (error) {
                console.error(error.message);
            }
        }

        return () => {
            setSellerID("");
        }
    }, []);

    if (!isAuthenticated) {
        return;
    }

    return (
        <div className="c-new-lst-cont">
            <ScrollToTop />

            <Link to="/">
                <img
                    className="auth-page amazon-logo"
                    src="/images/amazon-logo-black-text.png"
                    alt="Amazon"
                />
            </Link>

            <div className="c-new-lst-input-cont">
                <h1>Create A New Listing</h1>

                <form onClick={(e) => createANewListing(e)}>
                    <div className="c-new-lst-long-title-cont">
                        <h5>Seller ID</h5>
                        <p>(e.g. company name)</p>
                    </div>
                    <input
                        type="text"
                        value={sellerID}
                        onChange={(e) => setSellerID(e.target.value)}
                        required
                    />
                    
                    <h5>Product title</h5>
                    <input
                        type="text"
                        value={pTitle}
                        onChange={(e) => setPTitle(e.target.value)}
                        required
                    />

                    <h5>Product description</h5>
                    <textarea
                        maxLength="1000"
                        value={pDesc}
                        onChange={(e) => setPDesc(e.target.value)}
                    />

                    <h5>Product price</h5>
                    <input
                        type="number"
                        min="0.00"
                        step="any"
                        value={pPrice}
                        onChange={(e) => setPPrice(e.target.value)}
                        required
                    />

                    <h5>Available quantity</h5>
                    <input
                        type="number"
                        min="1"
                        step="any"
                        value={pAvailableQuantity}
                        onChange={(e) => setPAvailableQuantity(e.target.value)}
                        required
                    />

                    <h5>Product category</h5>
                    <div className="p-categ-dd-cont">
                        <Select
                            options={allProductCategories}
                            onChange={e => setDropDownCategoriesOption(e)}
                            value={selectedProductCategory.label}
                            placeholder="Select a category"
                            className="drop-down-product-categories"
                            isClearable
                        />
                    </div>

                    <div className="c-new-lst-long-title-cont">
                        <h5>Product photos</h5>
                        <p>(1 image is required)</p>
                    </div>
                    
                    <input
                        type="file"
                        // value={pTitle}
                        // onChange={(e) => setPTitle(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        // value={pTitle}
                        // onChange={(e) => setPTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        // value={pTitle}
                        // onChange={(e) => setPTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        // value={pTitle}
                        // onChange={(e) => setPTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        // value={pTitle}
                        // onChange={(e) => setPTitle(e.target.value)}
                    />

                    <div className="c-new-lst-btn-cont">
                        <button className="c-new-lst-btn">
                            Create your new listing
                        </button>
                    </div>

                    









                </form>
            </div>
        </div>
    );
}

export default CreateANewListing;
