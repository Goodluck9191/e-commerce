import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
	children: React.ReactNode;
}
export interface User {
	username: string;
	email: string;
	password: string;
}

interface UserContextType {
	user: User | null;
	signUp: (username: string, email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
	signOut: () => void;
}

const contextInitials = {
	user: null,
	signUp: () => {},
	signIn: () => {},
	signOut: () => {},
};

export const AuthContext = createContext<UserContextType>(contextInitials);

const AuthProvider = (props: Props) => {
	const navigate = useNavigate();

	const [user, setUser] = useState<User | null>(
		localStorage.getItem("currentUser")
			? JSON.parse(localStorage.getItem("currentUser") || "")
			: null,
	);

	function signUp(username: string, email: string, password: string) {
		const storedUser: User[] = JSON.parse(
			localStorage.getItem("users") || "[]",
		);

		const exist = storedUser.some((u) => u.email == email);

		if (exist) {
			alert("Email already exist please try to Login");
			return;
		}

		const newUser: User = { username, email, password };
		setUser(newUser)
		localStorage.setItem("currentUser", JSON.stringify(newUser));

		const updatedUser = [...storedUser, newUser];

		localStorage.setItem("users", JSON.stringify(updatedUser));

		alert("user added successfully");

		navigate("/");
	}

	function signIn(email: string, password: string) {
		const storedUser: User[] = JSON.parse(
			localStorage.getItem("users") || "[]",
		);

		const foundUser = storedUser.find(
			(u) => u.email == email && u.password == password,
		);

		if (foundUser) {
			alert(`welcome ${foundUser.username}`);
			localStorage.setItem("currentUser", JSON.stringify(foundUser));
			setUser(foundUser);

			navigate("/");
		} else {
			alert("Incorrect Login");
		}
	}

	function signOut() {
		localStorage.removeItem("currentUser");
		setUser(null);
		navigate("/");
	}

	return (
		<AuthContext.Provider value={{ signUp, user, signIn, signOut }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
