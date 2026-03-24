import  { useContext, useState, } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = {
	username: string;
	email: string;
	password: string;
};

const AuthPage = () => {
	const [signInMode, setSignInMode] = useState<boolean>(true);

	const { signUp, signIn } = useContext(AuthContext);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>();

	const onSubmit:SubmitHandler<FormValues>= (data) => {

		if (!signInMode) {
			signUp(data.username, data.email, data.password);

		} else {
			signIn(data.email, data.password);
	
		}

		reset()
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

								<form onSubmit={handleSubmit(onSubmit)}>
									<div className="flex flex-col gap-5 mt-8">
										{!signInMode && (
											<>
											<input
												type="text"
												placeholder="Username"
												{...register("username", {
													required:
														"username is required",
													minLength: {
														value: 6,
														message:
															"username must be at least 6 characters",
													},
													maxLength: {
														value: 12,
														message:
															"Username must be less than 12 character",
													},
												})}
												className="border p-3 rounded "
											/>
											{errors.username && (<span>{errors.username.message}</span>)}
											</>
										)}

										<input
											type="email"
											placeholder="Enter Email"
											{...register("email", {
												required: "Email is required",
											})}
											className="border p-3 rounded "
										/>
										{errors.email && (<span>{errors.email.message}</span>)}
										<input
											type="password"
											placeholder="Password"
											{...register("password", {
												required:
													"Password is required",
												minLength: {
													value: 6,
													message:
														"Password must be at least 6 characters",
												},
												maxLength: {
													value: 12,
													message:
														"Password must be less than 12 character",
												},
											})}
											className="border p-3 rounded "
										/>
										{errors.password && (<span>{errors.password.message}</span>)}

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
