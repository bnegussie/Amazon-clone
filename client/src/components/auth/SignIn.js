import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import "./../../App.css";

function SignIn() {

    const history = useHistory();

    return (
        <div className="sign-in-container">
            <Link to="/">
                <img
                    className="auth-page amazon-logo"
                    src="/images/amazon-logo-black-text.png"
                    alt="Amazon"
                />
            </Link>

            <div className="sign-in-or-create-account-container">
                <div className="sign-in-input-container">
                    <h1>Sign-In</h1>
                    <form>
                        <h5>Email</h5>
                        <input type="email" required />
                        <h5>Password</h5>
                        <input type="password" required />
                    </form>

                    <button className="sign-in-btn">
                        Sign-In
                    </button>
                </div>

                <div className="new-to-amazon-info-container">
                    <p className="new-to-amazon">
                        New to Amazon?
                    </p>
                </div>
                

                <button 
                    className="create-account-btn" 
                    onClick={e => history.push("/User/Create-Account")}>

                    Create your Amazon account
                </button>
            </div>
        </div>
    )
}

export default SignIn;
