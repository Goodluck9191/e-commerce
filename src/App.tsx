import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import { UserProvider } from "./context/UserContextProvider";

export default function App() {
	return (
		<div className="hero">
			<UserProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="*" element={<h1>404 not Found</h1>} />
				</Routes>
			</UserProvider>
		</div>
	);
}
