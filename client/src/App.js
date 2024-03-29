import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

// Components:
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";
import NavBar from "./components/nav-bar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/auth/SignIn";
import CreateAccount from "./components/auth/CreateAccount";
import CreateANewListing from "./components/products/CreateANewListing";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Quickly updating whether or not the user is authenticated:
    async function setAuth(authState) {
        setIsAuthenticated(authState);

        if (authState === false) {
            // Clearing the access token:
            const response = await fetch("http://localhost:5000/api/auth/log-out", {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (response.status !== 200) {
                const parseResp = await response.json();

                return toast.error(parseResp);
            }
        }
    }

    async function isAuth() {
        try {
            const response = await fetch("http://localhost:5000/api/auth/is-verified", {
                    method: "GET",
                    credentials: "include",
                }
            );

            const parseResp = await response.json();

            if ( response.status === 200 && parseResp !== "The user has not logged in." ) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    // Checking if the user is logged in each time the page is refreshed:
    useEffect(() => {
        isAuth();

        return () => {
            setIsAuthenticated(false);
        };
    }, []);

    if (isAuthenticated) {
        return (
            <Fragment>
                <Router>
                    <div className="app-container">
                        <ScrollToTop />

                        <Switch>
                            <Route exact path="/Checkout"
                                render={(props) => (
                                    <Fragment>
                                        <NavBar
                                            setAuth={setAuth}
                                            isAuthenticated={isAuthenticated}
                                            isAuth={isAuth}
                                        />
                                        <Checkout />
                                    </Fragment>
                                )}
                            />

                            <Route exact path="/User/Sign-In"
                                render={(props) => <Redirect to="/" />}
                            />

                            <Route exact path="/User/Create-Account"
                                render={(props) => <Redirect to="/" />}
                            />

                            <Route exact path="/Create-A-New-Listing"
                                render={(props) => (
                                    <CreateANewListing
                                        isAuth={isAuth}
                                        isAuthenticated={isAuthenticated}
                                    />
                                )}
                            />

                            {/* Home page and fallback page. */}
                            <Route
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <NavBar
                                            setAuth={setAuth}
                                            isAuthenticated={isAuthenticated}
                                            isAuth={isAuth}
                                        />
                                        <Home />
                                    </Fragment>
                                )}
                            />
                        </Switch>
                    </div>
                </Router>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Router>
                <div className="app-container">
                    <ScrollToTop />

                    <Switch>
                        <Route exact path="/Checkout"
                            render={(props) => (
                                <Fragment>
                                    <NavBar
                                        setAuth={setAuth}
                                        isAuthenticated={isAuthenticated}
                                        isAuth={isAuth}
                                    />
                                    <Checkout />
                                </Fragment>
                            )}
                        />

                        <Route exact path="/User/Sign-In"
                            render={(props) => <SignIn setAuth={setAuth} />}
                        />

                        <Route exact path="/User/Create-Account"
                            render={(props) => (
                                <CreateAccount setAuth={setAuth} />
                            )}
                        />

                        {/* Home page and fallback page. */}
                        <Route path="/"
                            render={(props) => (
                                <Fragment>
                                    <NavBar
                                        setAuth={setAuth}
                                        isAuthenticated={isAuthenticated}
                                        isAuth={isAuth}
                                    />
                                    <Home />
                                </Fragment>
                            )}
                        />
                    </Switch>
                </div>
            </Router>
        </Fragment>
    );
}

export default App;
