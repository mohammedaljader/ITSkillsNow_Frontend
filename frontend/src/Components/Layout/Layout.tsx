import React from 'react';
import Navbar from './Navbar';
import './css/Layout.css';

export type MainLayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<MainLayoutProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<div className="main">{children}</div>
		</>
	);
};

export default Layout;
