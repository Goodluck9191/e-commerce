
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";
import AuthProviders from "./context/AuthProviders";

export default function App() {
	return (
		<div className="hero">
			<AuthProviders>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="/auth" element={<AuthPage />} />
					<Route path="*" element={<h1>404 not Found</h1>} />
				</Routes>
			</AuthProviders>
		</div>
	);
}
