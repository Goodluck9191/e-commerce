import React, { createContext, useEffect, useState } from "react";

interface Props {
	children: React.ReactNode;
}
export interface User {
	username: string;
	email: string;
	password: string;
}

interface UserContextType {
	user: User[] | null;
	signUp: (username: string, email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
}

const contextInitials = {
	user: null,
	signUp: () => null,
	signIn: () => null,
};

export const Authcontext = createContext<UserContextType>(contextInitials);

const AuthProvider = (props: Props) => {
	const [user, setUser] = useState<User[] | null>(null);
	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [exist, setExist] = useState<boolean>(false);

	useEffect(() => {
		const users = JSON.parse(localStorage.getItem("users") || "[]");
		setUser(users);
	}, []);

	function signUp(username: string, email: string, password: string) {
		user?.map((user) => {
			if (user.email == email) {
				setExist(true);
			}
		});

		if (exist) {
			window.alert("The email already exist");
            setExist(false)
		} else {
			const newUser = {
				username: username,
				email: email,
				password: password,
			};

			user?.push(newUser);

			try {
				localStorage.setItem("users", JSON.stringify(user));
				window.alert("user added succseesfully");
			} catch (error) {
				console.log(error);
				window.alert("failed to add user");
			}
		}
	}
	function signIn(email: string, password: string) {
		user?.map((user) => {
			if (user.email == email && user.password == password) {
				setIsSignedIn(true);
			}
		});

		if (isSignedIn) {
			window.alert(`welcome you successfully login}`);
			setIsSignedIn(false);
		} else {
			window.alert("Sorry Incorrect Login");
		}
	}

	return (
		<Authcontext.Provider value={{ signUp, user, signIn }}>
			{props.children}
		</Authcontext.Provider>
	);
};

export default AuthProvider;
