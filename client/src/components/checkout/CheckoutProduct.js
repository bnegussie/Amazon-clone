import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../data-manager/StateProvider";

import "./../../App.css";

function CheckoutProduct({ id, shortTitle, title, price, image, quantity }) {
	// eslint-disable-next-line
	const [{ cart }, dispatch] = useStateValue();

	function removeAllItems() {
		dispatch({
			type: "REMOVE_ALL_ITEMS_FROM_CART",
			item: {
				id: id
			},
		});
	}

    function removeOneItem() {
		dispatch({
			type: "REMOVE_ONE_ITEM_FROM_CART",
			item: {
				id: id
			},
		});
	}

	return (
		<div className="checkout-product-container">
			<img
				className="checkout-product-img"
				src={image}
				alt={shortTitle ? shortTitle : title}
			/>

			<div className="checkout-product-info-container">
				<p className="checkout-product-title">{title}</p>

				<p className="checkout-product-price">
					<small>$</small>
					<strong>{price}</strong>
				</p>

				<div className="quantity-and-remove-container">
					<p className="quantity-value">Quantity: {quantity}</p>

					{quantity > 1 ? (
						<div>
							<Link className="remove-all-items-link" to="#" onClick={removeAllItems}>
								Remove all
							</Link>

							<Link className="remove-one-item-link" to="#" onClick={removeOneItem}>
								Remove one item
							</Link>
						</div>
					) : (
						<Link className="remove-item-link" to="#" onClick={removeAllItems}>
							Remove item
						</Link>
					)}
				</div>
			</div>
		</div>
	);
}

export default CheckoutProduct;
