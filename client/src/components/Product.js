import React from 'react';
import StarOutlineIcon from '@material-ui/icons/StarOutline';

// Components:
import { useStateValue } from './data-manager/StateProvider';

import "./../App.css";

function Product({ id, shortTitle, title, price, rating, image }) {
    
    // eslint-disable-next-line
    const [state, dispatch] = useStateValue();

    function addToBacket() {
        // Sending the item into the data layer:
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                shortTitle: shortTitle,
                title: title,
                price: price,
                rating: rating,
                image: image,
                quantity: 1
            }
        });
    }


    return (
        <div className="product-container">
            <div className="product-info-container">
                <p>{ title }</p>

                <p className="product-price">
                    <small>$</small>
                    <strong>{ price }</strong>
                </p>

                <div className="product-rating">
                    {Array(rating).fill().map((currRatingCounter, key) => (
                        <StarOutlineIcon className="star-icon" key={key} />
                    ))}
                    
                </div>
            </div>

            <div className="product-img-and-btn-container">
                <img
                    className="product-img"
                    src={ image }
                    alt={ shortTitle ? shortTitle : title }
                />
                <button className="product-btn" onClick={addToBacket} >
                    Add to basket
                </button>
            </div>
        </div>
    )
}

export default Product;
