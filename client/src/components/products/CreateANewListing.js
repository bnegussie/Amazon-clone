import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import CurrencyInput from 'react-currency-input-field';

// Components:
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";

function CreateANewListing({ isAuth, isAuthenticated }) {
    const [sellerID, setSellerID] = useState("");
    const [pBrandName, setPBrandName] = useState("");
    const [pTitle, setPTitle] = useState("");
    const [pDesc, setPDesc] = useState("");
    const [pPrice, setPPrice] = useState(0);
    const [pAvailableQuantity, setPAvailableQuantity] = useState("");

    const [allProductCategories, setAllProductCategories] = useState([]);
    const [selectedProductCategory, setSelectedProductCategory] = useState("");

    const [pPhotoOne, setPPhotoOne] = useState("");
    const [pPhotoTwo, setPPhotoTwo] = useState("");
    const [pPhotoThree, setPPhotoThree] = useState("");
    const [pPhotoFour, setPPhotoFour] = useState("");
    const [pPhotoFive, setPPhotoFive] = useState("");

    let history = useHistory();


    async function createANewListing(e) {
        e.preventDefault();

        // Input validation:
        if ( parseFloat( pPrice ) === 0) {
            return toast.error(
                "The minimum price, for a product, has to be at least one penny."
            );
        }

        const photos = [pPhotoOne, pPhotoTwo, pPhotoThree, pPhotoFour, pPhotoFive];
        const orderSyntax = ["first", "second", "third", "fourth", "fifth"];

        for (let i = 0; i < photos.length; i++) {
            if (photos[i] !== "") {
                if (photos[i].type !== "image/jpeg" && photos[i].type !== "image/png") {
                    return toast.error("Only JPEG and PNG file types are accepted.");
                }

                // 105 b/c .jpeg is an additional 5 characters:
                const photoMaxLength = photos[i].type === "image/jpeg" ? 105 : 104;

                if (photos[i].name.length >= photoMaxLength) {
                    return toast.error(`Please shorten your ${orderSyntax[i]} file name to be less than 100 characters.`);
                }
            }
        }
        // Completed input validation procedure.

        try {
            const data = new FormData();
            data.append('productImages', pPhotoOne);
            data.append('productImages', pPhotoTwo);
            data.append('productImages', pPhotoThree);
            data.append('productImages', pPhotoFour);
            data.append('productImages', pPhotoFive);

            data.append('sellerID', sellerID);
            data.append('pBrandName', pBrandName);
            data.append('pTitle', pTitle);
            data.append('pDesc', pDesc);
            data.append('pPrice', pPrice);
            data.append('selectedProductCategory', selectedProductCategory);
            data.append('pAvailableQuantity', pAvailableQuantity);

            const createListing = await fetch("http://localhost:5000/api/products/listing", {
                method: "POST",
                body: data,
                credentials: 'include'
            });
            const parseResp = await createListing.json();

            if (createListing.status === 200) {
                toast.success( parseResp.message, {autoClose: 3000} );
                setTimeout(() => { history.push("/") }, 3000);

            } else {
                return toast.error( parseResp.message );
            }

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

                <form onSubmit={(e) => createANewListing(e)}>
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

                    <h5>Product brand name</h5>
                    <input
                        type="text"
                        value={pBrandName}
                        onChange={(e) => setPBrandName(e.target.value)}
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
                        required
                    />

                    <h5>Product price</h5>
                    <CurrencyInput
                        name="product-price-input"
                        decimalsLimit={2}
                        prefix="$"
                        allowNegativeValue={false}
                        onValueChange={(value, name) => setPPrice(value)}
                        required
                    />

                    <h5>Available quantity</h5>
                    <input
                        type="number"
                        min="1"
                        step="1"
                        value={isNaN(pAvailableQuantity) ? "" : pAvailableQuantity}
                        onChange={(e) => {
                            let quantParam = "";
                            if (e.target.value !== "") {
                                // Removing leading zero, if present:
                                let temp = (e.target.value).replace(/^0+/, '');

                                quantParam = parseInt( temp );
                            }
                            setPAvailableQuantity( quantParam );
                        }}
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
                            required
                        />
                    </div>

                    <div className="c-new-lst-long-title-cont">
                        <h5>Product photos</h5>
                        <p>(1 image is required)</p>
                    </div>
                    
                    <input
                        type="file"
                        onChange={(e) => {
                            let pOneParam = typeof e.target.files[0] === 'undefined' ? "" : e.target.files[0];
                            setPPhotoOne( pOneParam );
                        }}
                        required
                    />
                    <input
                        type="file"
                        onChange={(e) => {
                            let pTwoParam = typeof e.target.files[0] === 'undefined' ? "" : e.target.files[0];
                            setPPhotoTwo( pTwoParam );
                        }}
                    />
                    <input
                        type="file"
                        onChange={(e) => {
                            let pThreeParam = typeof e.target.files[0] === 'undefined' ? "" : e.target.files[0];
                            setPPhotoThree( pThreeParam );
                        }}
                    />
                    <input
                        type="file"
                        onChange={(e) => {
                            let pFourParam = typeof e.target.files[0] === 'undefined' ? "" : e.target.files[0];
                            setPPhotoFour( pFourParam );
                        }}
                    />
                    <input
                        type="file"
                        onChange={(e) => {
                            let pFiveParam = typeof e.target.files[0] === 'undefined' ? "" : e.target.files[0];
                            setPPhotoFive( pFiveParam );
                        }}
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
