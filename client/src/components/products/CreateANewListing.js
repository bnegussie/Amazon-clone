import React, { useEffect } from "react";

import "./../../App.css";

function CreateANewListing({ isAuth, isAuthenticated }) {
    
    useEffect(() => {
        isAuth();
    }, [isAuth]);

    if (!isAuthenticated) {
        return;
    }

    return (
        <div className="create-a-new-listing-container">
            <h1>Create A New Listing</h1>
        </div>
    );
}

export default CreateANewListing;
