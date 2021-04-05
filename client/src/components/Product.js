import React from 'react';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

import "./../App.css";

function Product({ shortTitle, title, price, rating, image }) {
    return (
        <div className="product-container">
            <div className="product-info-container">
                <p>{ title }</p>

                <p className="product-price">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>

                <div className="product-rating">
                    {Array(rating).fill().map((currRatingCounter) => (
                        <StarOutlineIcon className="star-icon" />
                    ))}
                    
                </div>
            </div>

            <div className="product-img-and-btn-container">
                <img
                    className="product-img"
                    src={ image }
                    alt={ shortTitle ? shortTitle : title }
                />
                <button className="product-btn">
                    Add to basket
                </button>
            </div>
        </div>
    )
}

export default Product;
