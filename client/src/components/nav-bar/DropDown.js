import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom"

// Components:
import { YourAccount_MenuItems, YourListings_MenuItems } from "./MenuItems";

import "./../../App.css";

function DropDown({ isAuthenticated, setAuth }) {
    const [dropDownShowing, setDropDownShowing] = useState(false);

    const toggleDropDownMenu = () => { setDropDownShowing(!dropDownShowing) };

    let history = useHistory();

    async function logout(e) {
        e.preventDefault();

        if (isAuthenticated) {
            await setAuth(false);
            history.push("/");
            toast.success("You have successfully logged out.", {autoClose: 3000});
        }
    }

    return (
        <div className="drop-down-container">
            <ul
                onClick={toggleDropDownMenu}
                className={ dropDownShowing ? "drop-down-menu clicked" : "drop-down-menu" }
            >
                <div className="drop-down-left-container">
                    <h4 className="drop-down-titles">Your Listings</h4>
                    {
                        YourListings_MenuItems.map((item, index) => {
                            return (
                                <li key={index} >
                                    <Link 
                                        className={item.className}
                                        to={item.path}
                                        onClick={() => setDropDownShowing(false)}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </div>
                <div className="drop-down-right-container">
                    <h4 className="drop-down-titles">Your Account</h4>
                    {
                        YourAccount_MenuItems.map((item, index) => {
                            return (
                                <li key={index} >
                                    <Link 
                                        className={item.className}
                                        to={item.path}
                                        onClick={item.path === '' ? 
                                            (e) => logout(e) 
                                            : 
                                            (e) => setDropDownShowing(false)
                                        }
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </div>
            </ul>            
        </div>
    );
}

export default DropDown;
