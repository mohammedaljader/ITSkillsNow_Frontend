import React from 'react';
import './app.css';

function App() {
	return (
		<div className="login-page">
			<form className="login-form">
				<h2>Login</h2>
				<input
					type="email"
					placeholder="Email"
					className="login-input"
				/>
				<input
					type="password"
					placeholder="Password"
					className="login-input"
				/>
				<button className="login-button">Login</button>
				<a
					className="forgot-password-link"
					href="#3"
				>
					Forgot Password?
				</a>
			</form>
		</div>
	);
}

export default App;
