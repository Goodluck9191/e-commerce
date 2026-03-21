import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/UserContextProvider";

const Navbar = () => {
	const { users } = useContext(userContext);
    const [isSignedIn, setIsSigned] = useState<boolean>(true)

    const username = users?.map((user) => {
        if (user.name == 'goodluck') {
            return user.name
        }
    })

    const handleLogin = () => {
        setIsSigned((prev) => !prev)
    }
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

                    { isSignedIn ? (
                        <>
                            <span className={'greeting'}>{ username?`Hi, ${username}`: 'Signed in'}</span>
                            <button className={'btn cta'}>
                                <Link to={''} onClick={handleLogin}>Log Out</Link>
                            </button>
                        </>
                    ) : (
                        <>
                            <button >
                                <Link to={''}>Log In</Link>
                            </button>

                            <Link to={'/auth'} className={'cta'}>Get Started</Link>

                        </>
                    )}
				</div>
			</nav>
		</header>
    
	);
};

export default Navbar;
