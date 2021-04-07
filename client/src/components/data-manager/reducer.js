const initialState = {
    basket: []
}


// reducer is the mechanism by which the data is pushed into the data layer.
const reducer = (state, action) => {

    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item]   
            };
        default:
            return state;
    }
};


export { initialState };
export default reducer;
