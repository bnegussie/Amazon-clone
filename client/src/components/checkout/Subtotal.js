import CurrencyFormat from "react-currency-format";
import React from 'react';

import "./../../App.css";

function Subtotal() {
    return (
        <div className="subtotal-container">
            <CurrencyFormat 
                renderText={(value) => (
                    <div>
                        <p>
                            Subtotal (0 items): <strong>0</strong>
                        </p>
                        <small className="subtotal-gift">
                            <input type="checkbox" />
                            This Order contains a gift
                        </small>
                    </div>
                )}
                decimalScale={2}
                value={0}
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
