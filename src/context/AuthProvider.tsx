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
	users: User[] | null;
	signUp: (username: string, email: string, password: string) => void;
	signIn: (email: string, password: string) => void;
}

const contextInitials = {
	users: null,
	signUp: () => {},
	signIn: () => {},
};

export const AuthContext = createContext<UserContextType>(contextInitials);

const AuthProvider = (props: Props) => {
	const [users, setUsers] = useState<User[]>([])


	useEffect(()=> {
		const storedUser = JSON.parse(localStorage.getItem("users") || "[]")
		setUsers(storedUser)
	}, [])


	function signUp(username:string, email:string, password:string) {
		const exist = users.some(u => u.email == email)

		if(exist) {
			alert('Email already exist please try to Login')
			return;
		}

		const newUser: User = { username, email, password }

		const updatedUser = [...users, newUser]

		setUsers(updatedUser);

		localStorage.setItem("users", JSON.stringify(updatedUser))

		alert('user added successfully')
	}

	function signIn(email:string, password:string) {

		const foundUser = users.find(u => u.email == email && u.password == password)

		if (foundUser) {

			alert(`welcome ${foundUser.username}`)

		} else {
			alert('Incorrect Login')
		}
	}






	return (
		<AuthContext.Provider value={{ signUp, users, signIn }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
