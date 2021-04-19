import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// Components:
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";
import NavBar from "./components/nav-bar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/auth/SignIn";
import CreateAccount from "./components/auth/CreateAccount";

import "./App.css";
import 'react-toastify/dist/ReactToastify.css'

toast.configure();


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // Quickly updating whether or not the user is authenticated:
  async function setAuth( authState ) {
    setIsAuthenticated(authState);

    if (authState === false) {
      // Clearing the access token:
      const response = await fetch("http://localhost:5000/api/auth/log-out", {
        method: "GET",
        credentials: 'include'
      });

      if (response.status !== 200) {
        const parseResp = await response.json();

        return toast.error( parseResp );
      }
    }
  }

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/api/auth/is-verified", {
        method: "GET",
        credentials: 'include'
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
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
    }
  }, []);


	return (
		<Fragment>
			<Router>
				<div className="app-container">
					<ScrollToTop />

          <Switch>
            <Route exact path="/Checkout" 
              render={props =>
                <Fragment>
                  <NavBar setAuth={setAuth} isAuthenticated={isAuthenticated} />
                  <Checkout />
                </Fragment>
              }
            />

            <Route exact path="/User/Sign-In" 
              render={props =>
                isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <SignIn setAuth={setAuth} />
                )
              }
            />

            <Route exact path="/User/Create-Account" 
              render={props =>
                isAuthenticated ? (
                  <Redirect to="/" />
                ) : (
                  <CreateAccount setAuth={setAuth} />
                )
              }
            />

            
            


            
            {/* Home page and fallback page. */}
            <Route path="/" 
              render={props =>
                <Fragment>
                  <NavBar setAuth={setAuth} isAuthenticated={isAuthenticated} />
                  <Home />
                </Fragment>
              }
            />
          </Switch>

				</div>
			</Router>
		</Fragment>
	);
}

export default App;
