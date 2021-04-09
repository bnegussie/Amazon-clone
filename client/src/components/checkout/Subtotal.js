import CurrencyFormat from "react-currency-format";
import React from 'react';

// Components:
import { useStateValue } from "../data-manager/StateProvider";
import { getCartTotal, getCartItemCount } from "../data-manager/reducer";

import "./../../App.css";

function Subtotal() {

    // eslint-disable-next-line
    const [{ cart }, dispatch] = useStateValue();



    return (
        <div className="subtotal-container">
            <CurrencyFormat 
                renderText={(value) => (
                    <div>
                        <p>
                            Subtotal ({ getCartItemCount(cart) } items): <strong> {value} </strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" />
                            This Order contains a gift
                        </small>
                    </div>
                )}
                decimalScale={2}
                value={ getCartTotal(cart) }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />

            <button className="subtotal-btn">
                Proceed to checkout
            </button>
        </div>
    )
}

export default Subtotal;
