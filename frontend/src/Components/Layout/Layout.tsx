import React from 'react';
// import Navbar from './Navbar';
import './css/Layout.css';
import ResponsiveAppBar from '../MaterialUI/ResponsiveAppBar';

export type MainLayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			{/* <Navbar /> */}
			<ResponsiveAppBar />
			<div className="main">{children}</div>
		</>
	);
};

export default Layout;
