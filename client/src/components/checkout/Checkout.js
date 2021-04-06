import React from 'react';
import Grid from "@material-ui/core/Grid";

// Components:
import Subtotal from './Subtotal';

import "./../../App.css";

function Checkout() {
    return (
        <div className="checkout-container">
            <img 
                className="checkout-page ad"
                src="/images/checkout/ocean_credit_card.png"
                alt="Ocean Credit Card"
            />

            <Grid container className="checkout-grid-container">

                <Grid item xs={7} className="checkout-left-container">
                    <h2 className="checkout-title">Shopping Cart</h2>
                </Grid>

                
                <Grid item xs={4} className="checkout-right-container">
                    <Subtotal />
                </Grid>

            </Grid>
        </div>
    )
}

export default Checkout;
