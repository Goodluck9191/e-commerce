
import Products from "../components/Products";
import Navbar from "../components/Navbar";
import { ArrowRight} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProviders";

const HomePage = () => {

	const { user, signOut} = useContext(AuthContext)

	const navigate = useNavigate()
	return (
		<div className="home">
			<Navbar />
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

				<div className={'actions'}>
                  <button onClick={() => navigate('/auth')} className={'cta'}>
                      Get Started <ArrowRight className={'icon'}/>
                  </button>

				  </div>

			</section>

			<Products />
		</div>
	);
};

export default HomePage;
