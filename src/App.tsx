import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContextProvider";

export default function App() {
	return (
		<UserProvider>
			<div className="home">
				<Navbar />

				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="*" element={<h1>404 not Found</h1>} />
				</Routes>

				<div>Footer</div>
			</div>
		</UserProvider>
        
	);
}
