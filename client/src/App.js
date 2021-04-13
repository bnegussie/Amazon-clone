import React, { Fragment } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components:
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";
import NavBar from "./components/nav-bar/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./components/auth/SignIn";

import "./App.css";

function App() {
	return (
		<Fragment>
			<Router>
				<div className="app-container">
					<ScrollToTop />

          <Switch>
            <Route exact path="/Checkout">
              <NavBar />
              <Checkout />
            </Route>

            <Route exact path="/User/Sign-In">
              <SignIn />
            </Route>

            





            
            {/* Home page and fallback page. */}
            <Route path="/">
              <NavBar />
              <Home />
            </Route>
          </Switch>

				</div>
			</Router>
		</Fragment>
	);
}

export default App;
