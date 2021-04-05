import React, { Fragment } from "react";
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Components:
import Checkout from "./components/Checkout";
import Home from "./components/home/Home";
import NavBar from "./components/nav-bar/NavBar";
import ScrollToTop from "./components/ScrollToTop";

import "./App.css";

function App() {
	return (
		<Fragment>
			<Router>
				<div className="app-container">
					<ScrollToTop />
          <NavBar />

          <Switch>
            <Route exact path="/Checkout" render={props => <Checkout /> } />





            
            {/* Home page and fallback page. */}
            <Route path="/" render={props => <Home /> } />
          </Switch>

				</div>
			</Router>
		</Fragment>
	);
}

export default App;
