import React from "react";
import Products from "../components/Products";

const HomePage = () => {
	return (
		<>
			<section className="hero">
				<div className={"announce"}>
					<div className={"dot"}>
						<div className={"pulse"}></div>
					</div>

					<p>Introducing GoodyShop 2.0</p>
				</div>

				<h1>Welcome to GoodyShop</h1>
				<p className={"subtitle"}>
					Discover the amazing Products with great Prices
				</p>
			</section>

			<Products />
		</>
	);
};

export default HomePage;
