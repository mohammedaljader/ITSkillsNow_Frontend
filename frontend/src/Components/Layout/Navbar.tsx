import React, { useState } from 'react';
import './css/NavBar.css';

const Navbar: React.FC = () => {
	const [click, setClick] = useState<boolean>(false);
	const handleClick = () => setClick(!click);

	return (
		<>
			<nav className="navbar">
				<div className="nav-container">
					<a
						href="/"
						className="nav-logo"
					>
						ITSkillsNow
					</a>
					<ul className={click ? 'nav-menu active' : 'nav-menu'}>
						<li className="nav-item ">
							<a
								href="/"
								className="nav-links"
							>
								Home
							</a>
						</li>
						<li className="nav-item ">
							<a
								href="/course"
								className="nav-links"
							>
								Courses
							</a>
						</li>
						<li className="nav-item ">
							<a
								href="/message"
								className="nav-links"
							>
								Messages
							</a>
						</li>
						<li className="nav-item login">
							<a
								href="/signup"
								className="nav-links"
							>
								Sign up
							</a>
						</li>
						<li className="nav-item login">
							<a
								href="/signin"
								className="nav-links"
							>
								Sign in
							</a>
						</li>
					</ul>
					<div
						className="nav-icon"
						onClick={handleClick}
					>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;
