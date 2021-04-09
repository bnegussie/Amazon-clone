import React from 'react';
import Grid from "@material-ui/core/Grid";

// Components:
import Subtotal from './Subtotal';
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from '../data-manager/StateProvider';
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";


function Checkout() {

    // eslint-disable-next-line
    const [{ cart }, dispatch] = useStateValue();



    return (
        <div className="checkout-container">
            <ScrollToTop />

            <img 
                className="checkout-page ad"
                src="/images/checkout/ocean_credit_card.png"
                alt="Ocean Credit Card"
            />

            <Grid container className="checkout-grid-container">

                <Grid item xs={7} className="checkout-left-container">
                    <h2 className="checkout-title">Shopping Cart</h2>

                    {cart.map((item, key) => (
                        <CheckoutProduct  
                            key={key} 
                            id={item.id}
                            shortTitle={item.shortTitle}
                            title={item.title}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                        />
                    ))}


                </Grid>

                
                <Grid item xs={4} className="checkout-right-container">
                    <Subtotal />
                </Grid>

            </Grid>
        </div>
    )
}

export default Checkout;
