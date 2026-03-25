import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProviders";
import { useNavigate } from "react-router-dom";




const Navbar = () => {

    const { user, signOut } = useContext(AuthContext)
    const navigate = useNavigate()




	return (
		<header className="navbar">
			<nav className="inner">
				<div className="left">
					<div className="brand">
						<Link to={"/"} className="name">
							GoodyShop
						</Link>
					</div>
					<ul className="links">
						<Link to={"/"}>Products</Link>
						<Link to={"/profile"}>Cart</Link>
						<Link to={""}>Category</Link>
						<Link to={""}>Blog</Link>
					</ul>
				</div>

				<div className="actions">

                    { user ? (
                        <>
                            <span className={'greeting'}>{ user.username?`Hi, ${user.username}`: 'Signed in'}</span>
                            <button className={'btn cta'} onClick={signOut}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>

                            <button onClick={() => navigate('/auth')} className="cta">Log in</button>

                        </>
                    )}
				</div>
			</nav>
		</header>
    
	);
};

export default Navbar;
