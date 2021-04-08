import React from "react";

// Components:
import Product from "./../Product";
import ScrollToTop from "./../ScrollToTop";

import "./../../App.css";

function Home() {
	return (
		<div className="home-container">
			<ScrollToTop />

			<div className="bkgd-container">
				<img
					className="home-bkgd-img"
					src="/images/home/amazon_home_bkgd_img.png"
					alt="Amazon spring deals"
				/>
			</div>

			<div className="home-rows">
				<Product
					id={7513498532180}
					shortTitle="The Lean Startup"
					title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
					price={19.99}
					rating={4}
					image="/images/product/THE-LEAN-STARTUP.png"
				/>

				<Product
					id={7515498532185}
					shortTitle="Instant Pot Duo"
					title="Instant Pot Duo Plus 6 Quart 9-in-1 Electric Pressure Cooker, Slow Cooker, Rice Cooker, Steamer, Saute, Yogurt Maker, Warmer & Sterilizer, 15 One-Touch Programs"
					price={99.95}
					rating={5}
					image="/images/product/Instant-Pot.png"
				/>
			</div>

			<div className="home-rows">
				<Product
					id={7513498539185}
					shortTitle="Fitbit"
					title="Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Sleep & Swim Tracking, Black/Black, One Size (S &L Bands Included)"
					price={147.88}
					rating={3}
					image="/images/product/fitbit.png"
				/>

				<Product
					id={7513498532185}
					shortTitle="Bose Sport Earbuds"
					title="Bose Sport Earbuds - True Wireless Earphones - Bluetooth In Ear Headphones for Workouts and Running, Triple Black"
					price={179.00}
					rating={5}
					image="/images/product/Bose.png"
				/>

				<Product
					id={7513498532165}
					shortTitle="New Apple iPhone 12 Pro"
					title="New Apple iPhone 12 Pro (512GB, Pacific Blue) [Locked] + Carrier Subscription"
					price={1299.00}
					rating={4}
					image="/images/product/iPhone-12-Pro.png"
				/>
			</div>

			<div className="home-rows">
				<Product
					id={7813498532185}
					shortTitle="Insignia NS 39-inch Smart HD 720p TV"
					title="Insignia NS-39DF310NA21 39-inch Smart HD 720p TV - Fire TV Edition"
					price={179.99}
					rating={3}
					image="/images/product/Insignia-NS.png"
				/>
			</div>
		</div>
	);
}

export default Home;
