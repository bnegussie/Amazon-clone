import { Link } from "react-router-dom";
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import "./../../App.css"

function NavBar() {
    return (
        <div className="nav-bar container">
            <Link to="/">
                <img 
                    className="amazon-logo"
                    src="/images/amazon-logo.png"
                    alt="Amazon"
                />
            </Link>

            <div className="search-bar container">
                <input className="search-bar" type="text" /> 
                <SearchIcon className="search-icon" />
            </div>

            <div className="nav-bar-options_container">
                <div className="nav-bar-options">
                    <span className="nav-bar-options_line-one">Hello</span>
                    <span className="nav-bar-options_line-two">Sign in</span>
                </div>

                <div className="nav-bar-options">
                    <span className="nav-bar-options_line-one">Returns</span>
                    <span className="nav-bar-options_line-two">& Orders</span>
                </div>

                <div className="nav-bar-options">
                    <span className="nav-bar-options_line-one">Your</span>
                    <span className="nav-bar-options_line-two">Prime</span>
                </div>

                <Link to="/Checkout" className="nav-bar-options_basket">
                    <ShoppingBasketIcon />

                    <span className="nav-bar-options_line-two basket-counter">0</span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;
