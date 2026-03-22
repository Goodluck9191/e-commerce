import React from "react";
import { products } from "../products/Products";

const Products = () => {
	return (
		<section className={"projects"}>
			<div className={"section-inner"}>
				<div className={"section-head"}>
					<div className={"copy"}>
						<h2>Our Products</h2>
						<p>
							Discover our latest Products for this Year
						</p>
					</div>
				</div>

				<div className={"projects-grid"}>

                    {products.map((product) => (

                        <div className={"project-card group"} key={product.id}>
						<div className={"preview"}>
							<img
								src={product.image}
								alt="projects"
							/>

							<div className={"badge"}>
								<span>${product.price}</span>
							</div>
						</div>

						<div className={"card-body"}>
							<div>
								<h3>{product.name}</h3>

								<div className={"meta"}>
									
									<span>
										{new Date(
											"01.01.2027",
										).toLocaleDateString()}
									</span>
									<span>By Goodluck</span>
								</div>
							</div>
							<div className={"arrow"}>
								
							</div>
						</div>
					</div>

                    ))}


					
				</div>
			</div>
		</section>
	);
};

export default Products;
