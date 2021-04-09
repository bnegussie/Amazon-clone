import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../data-manager/StateProvider';

import "./../../App.css"

function CheckoutProduct({ id, shortTitle, title, price, image, quantity }) {

    // eslint-disable-next-line
    const [{ cart }, dispatch] = useStateValue();

    function removeFromCart() {
        dispatch({
            type: "REMOVE_FROM_CART",
            item: {
                id: id
            }
        });
    }



    return (
        <div className="checkout-product-container">
            <img 
                className="checkout-product-img"
                src={image}
                alt={ shortTitle ? shortTitle : title }
            />

            <div className="checkout-product-info-container">
                <p className="checkout-product-title">{ title }</p>

                <p className="checkout-product-price">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>

                <div>
                    <h3>Quantity: { quantity }</h3>
                    <Link 
                        className="remove-item-link" 
                        to="#"
                        onClick={removeFromCart} >
                        Delete
                    </Link>
                </div>


            </div>

        </div>
    )
}

export default CheckoutProduct;
