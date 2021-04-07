import React, { createContext, useContext, useReducer } from "react";

// The React Context API:


// Preparing the data layer:
const StateContext = createContext();

// Wrapping the app and providing the data layer:
const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={ useReducer(reducer, initialState) }>
        {children}
    </StateContext.Provider>
);

// Pulling information from the data layer:
const useStateValue = () => useContext(StateContext);


export { StateContext, StateProvider, useStateValue };
