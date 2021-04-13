import React from 'react';
import { Link } from 'react-router-dom';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

// Components:
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";

function CreateAccount() {
    return (
        <div className="create-account-container">
            <ScrollToTop />

            <Link to="/">
                <img 
                    className="auth-page amazon-logo"
                    src="/images/amazon-logo-black-text.png"
                    alt="Amazon"
                />
            </Link>

            <div className="create-account-input-container">
                <h1>Create account</h1>

                <form>
                    <h5>Your name</h5>
                    <input type="text" required />

                    <h5>Email</h5>
                    <input type="email" required />
                    
                    <h5>Password</h5>
                    <input 
                        type="password" 
                        required 
                        placeholder=" At least 6 characters"
                    />
                    <div className="pwd-length-info-block">
                        <InfoOutlinedIcon />
                        <p>Passwords must be at least 6 characters.</p>
                    </div>
                    
                    <h5>Re-enter password</h5>
                    <input type="password" required />
                    
                    <button>
                        Create your Amazon account
                    </button>
                </form>


                <div className="create-account-redirect-container">
                    Already have an account? 
                    <Link 
                        to="/User/Sign-In" 
                        className="create-account-sign-in-link">
                        
                        <p>Sign-In <ArrowRightIcon /> </p>
                        
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateAccount;
