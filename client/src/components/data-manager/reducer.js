const initialState = {
    cart: []
}

// Quickly calculating the user's subtotal:
const getCartTotal = (cart) => 
    cart?.reduce((amount, item) => (item.price * item.quantity) + amount, 0);

// Calculating the number of items in the Shopping Cart:
const getCartItemCount = (cart) =>
    cart?.reduce((totalItems, item) => item.quantity + totalItems, 0);


// reducer is the mechanism by which the data is pushed into the data layer.
const reducer = (state, action) => {    

    switch (action.type) {
        case "ADD_TO_CART":
            let newCart = [...state.cart];
            var duplicateFound = false;

            state.cart.forEach(function(item, index) {

                /* Checking if the item already exists in the cart;
                 * if so we can just increment the tally instead of adding another 
                 * object into the cart.
                 */
                if (item.id === action.item.id) {
                    duplicateFound = true;

                    // Cloning the JSON object is necessary because without it,
                    // the quantity value update will result in an incorrect value.
                    let duplcateClone = JSON.parse( JSON.stringify( newCart[index] ) );
                    duplcateClone.quantity++;
                    newCart[index] = duplcateClone;
                }
            });

            if (!duplicateFound) {
                newCart = [...state.cart, action.item];
            }

            return {
                ...state,
                cart: newCart  
            };
        case "REMOVE_ALL_ITEMS_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.item.id)
            };
        case "REMOVE_ONE_ITEM_FROM_CART":
            let removeOneItemCart = [...state.cart];
            let itemFound = false;

            state.cart.forEach(function(item, index) {

                // Locating the item:
                if (item.id === action.item.id) {
                    itemFound = true;

                    let duplcateClone = JSON.parse( JSON.stringify( removeOneItemCart[index] ) );
                    duplcateClone.quantity--;
                    removeOneItemCart[index] = duplcateClone;
                }
            });
            if (!itemFound) {
                console.warn(`Couldn't remove item (id = ${action.item.id}) as it is not in the cart.`);
            }

            return {
                ...state,
                cart: removeOneItemCart
            };
        default:
            return state;
    }
};


export { getCartTotal, getCartItemCount, initialState };
export default reducer;
