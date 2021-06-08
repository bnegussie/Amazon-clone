import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Select from "react-select";

// Components:
import { useStateValue } from "../data-manager/StateProvider";
import { getCartItemCount } from "./../data-manager/reducer";
import DropDown from "./DropDown";

import "./../../App.css";

function NavBar({ setAuth, isAuthenticated, isAuth }) {

    // eslint-disable-next-line
    const [{ cart }, dispatch] = useStateValue();
    
    const [allSearchCategories, setAllSearchCategories] = useState([]);
    const [selectedSearchCategory, setSelectedSearchCategory] = useState("");
    // eslint-disable-next-line
    const [selectedSearchCategoryTable, setSelectedSearchCategoryTable] = useState("");

    const [userName, setUserName] = useState("");

    const [dropDown, setDropDown] = useState(false);

    const displayDropDownMenu = () => { setDropDown(true); };
    const closeDropDownMenu = () => { setDropDown(false) };
    

    function setSeachBar(e) {
        if (e) {
            setSelectedSearchCategory( e.label );
            setSelectedSearchCategoryTable( e.value );
        } else {
            setSelectedSearchCategory("");
            setSelectedSearchCategoryTable("");
        }
    }

    async function checkAuthStatus() {
        if (isAuthenticated) {
            await isAuth();
        }
    }

    // Capturing the categories for the products in the Amazon store:
    // Used for the search bar.
    useEffect(() => {
        getCategories();

        async function getCategories() {
            try {
                const response = await fetch("http://localhost:5000/api/products/categories");

                const productCategories = await response.json();

                productCategories.forEach(function(currCategory, index) {
                    allSearchCategories.push({
                        "label": `${currCategory.c_name}`,
                        "value": `${currCategory.table_name}`
                    })
                });

            } catch (error) {
                console.error(error.message);
            }
        }

        return () => {
            setAllSearchCategories([]);
        }

    }, [allSearchCategories]);


    // Getting the user's name if they have signed in:
    useEffect(() => {
		getUserName();

        async function getUserName() {
            if (isAuthenticated) {
                try {
                    const response = await fetch("http://localhost:5000/api/users/user-name", {
                        method: "GET",
                        credentials: 'include'
                    });

                    const parseResp = await response.json();

                    if (response.status === 200) {
                        setUserName( parseResp.user_name );
                    }

                } catch (error) {
                    console.error( error.message );
                }
            }
        }

        return () => {
            setUserName("");
        }

	}, [isAuthenticated]);



    return (
        <div className="nav-bar container" onMouseEnter={checkAuthStatus}>
            <Link to="/">
                <img 
                    className="amazon-logo"
                    src="/images/amazon-logo-white-text.png"
                    alt="Amazon"
                />
            </Link>

            <div className="search-bar container">
                <Select
                    options={allSearchCategories}
                    onChange={e => setSeachBar(e)}
                    value={selectedSearchCategory.label}
                    placeholder="Search by categories"
                    className="product-categories"
                    isClearable
                />
                <SearchIcon className="search-icon" />
            </div>

            <div className="nav-bar-options_container">

                {isAuthenticated ? 
                    (
                        <div className="nav-bar-options" onMouseEnter={displayDropDownMenu} onMouseLeave={closeDropDownMenu} >

                            <span className="nav-bar-options_line-one">Hello { userName },</span>
                            <div className="nav-bar-sign-in">
                                <span className="nav-bar-options_line-two"> 
                                    Account & Listings
                                </span>
                                <ArrowDropDownIcon />
                            </div>
                            {dropDown && 
                                <DropDown isAuthenticated={isAuthenticated} setAuth={setAuth} />
                            }
                        </div>
                    ) 
                    :
                    (
                        <Link to="/User/Sign-In">
                            <div className="nav-bar-options">
                                <span className="nav-bar-options_line-one">Hello</span>
                                <div className="nav-bar-sign-in">
                                    <span className="nav-bar-options_line-two"> 
                                        Sign In
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                }
                

                <div className="nav-bar-options">
                    <span className="nav-bar-options_line-one">Returns</span>
                    <span className="nav-bar-options_line-two">& Orders</span>
                </div>

                <Link to="/Checkout" className="nav-bar-options_cart">
                    <ShoppingCartIcon />

                    <span className="nav-bar-options_line-two cart-counter">
                        { getCartItemCount(cart) }
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;
