import React, { useContext, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const AuthPage = () => {
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [signInMode, setSignInMode] = useState<boolean>(true);

	const { signUp, signIn } = useContext(AuthContext);

	const handleSUbmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!signInMode) {
			signUp(username, email, password);

			setUsername("");
			setEmail("");
			setPassword("");
		} else {
			signIn(email, password)
			setEmail('') 
			setPassword('')
		}

		
	};

	const HandleAuthMode = () => {
		setSignInMode((prev) => !prev);
	};

	return (
		<div>
			<header className="navbar ">
				<nav className="inner">
					<div className="left">
						<div className="brand">
							<Link to={"/"} className="name">
								GoodyShop
							</Link>
						</div>
					</div>

					<div className="actions">
						<button
							onClick={HandleAuthMode}
							className="cursor-pointer"
						>
							{signInMode ? "Sign up" : "Sign In"}
						</button>

						<Link to={"/auth"} className={"cta"}>
							Request Demo
						</Link>
					</div>
				</nav>
			</header>
			<div className="home">
				<div className="hero">
					<div id={"upload"} className={"upload-shell"}>
						<div className={"grid-overlay"} />

						<div className={"upload-card"}>
							<div className={"upload-head"}>
								<div className={"upload-icon"}></div>

								<h3>
									Customer {signInMode ? "Login" : "Sign up"}
								</h3>
								<p>
									Hey, Enter your details to{" "}
									{signInMode ? (
										<span>
											get Sign in to your acccount
										</span>
									) : (
										<span>create your account</span>
									)}
								</p>

								<form onSubmit={handleSUbmit}>
									<div className="flex flex-col gap-5 mt-8">
										{!signInMode && (
											<input
												type="text"
												placeholder="Username"
												value={username}
												onChange={(
													e: ChangeEvent<HTMLInputElement>,
												) =>
													setUsername(e.target.value)
												}
												className="border p-3 rounded "
											/>
										)}

										<input
											type="email"
											placeholder="Enter Email"
											value={email}
											onChange={(
												e: ChangeEvent<HTMLInputElement>,
											) => setEmail(e.target.value)}
											className="border p-3 rounded "
										/>
										<input
											type="password"
											placeholder="Password"
											value={password}
											onChange={(
												e: ChangeEvent<HTMLInputElement>,
											) => setPassword(e.target.value)}
											className="border p-3 rounded "
										/>

										<div>
											<Link to={""}>
												Having trouble in{" "}
												{signInMode
													? "Sign in"
													: "Sign up"}
												?
											</Link>
										</div>

										<div className={"actions"}>
											<button
												type="submit"
												className="cta"
											>
												{signInMode
													? "Sign in"
													: "Sign up"}
											</button>
										</div>

										<div>
											<span>
												-Or{" "}
												{signInMode
													? "sign in"
													: "sign up"}{" "}
												with-
											</span>
										</div>
										<div className={"actions mt-3"}>
											<button className="demo font-semibold p-3 cursor-pointer">
												Google
											</button>
											<button className="demo font-semibold p-3 cursor-pointer">
												Apple ID
											</button>
											<button className="demo font-semibold p-3 cursor-pointer">
												Facebook
											</button>
										</div>
										<div>
											<p>
												{signInMode
													? "Don't have an account?"
													: "Do you have an account"}

												<span
													onClick={HandleAuthMode}
													className="font-bold cursor-pointer"
												>
													{signInMode
														? "Sign up"
														: "sign in"}
												</span>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;
