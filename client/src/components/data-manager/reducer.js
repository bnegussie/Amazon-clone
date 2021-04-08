const initialState = {
    basket: []
}

// Quickly calculating the user's subtotal:
const getBasketTotal = (basket) => 
    basket?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);

// Calculating the number of items in the Shopping Cart:
const getCartItemCount = (basket) =>
    basket?.reduce((totalItems, item) => item.quantity + totalItems, 0);


// reducer is the mechanism by which the data is pushed into the data layer.
const reducer = (state, action) => {    

    switch (action.type) {
        case "ADD_TO_BASKET":
            let newBasket = [...state.basket];
            var duplicateFound = false;

            state.basket.forEach(function(item, index) {

                /* Checking if the item already exists in the cart;
                 * if so we can just increment the tally instead of adding another 
                 * object into the cart.
                 */
                if (item.id === action.item.id) {
                    duplicateFound = true;

                    let duplcateClone = JSON.parse( JSON.stringify( newBasket[index] ) );
                    duplcateClone.quantity++;
                    newBasket[index] = duplcateClone;
                }
            });

            if (!duplicateFound) {
                newBasket = [...state.basket, action.item];
            }

            return {
                ...state,
                basket: newBasket  
            };
        case "REMOVE_FROM_CART":
            return {

            }
        default:
            return state;
    }
};


export { getBasketTotal, getCartItemCount, initialState };
export default reducer;
