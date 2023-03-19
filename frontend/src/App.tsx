import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import CourseListPage from './Pages/CourseListPage';
import Home from './Pages/Home';
import MessageListPage from './Pages/MessageListPage';

function App() {
	return (
		<Layout>
			<Router>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/course"
						element={<CourseListPage />}
					/>
					<Route
						path="/message"
						element={<MessageListPage />}
					/>
				</Routes>
			</Router>
		</Layout>
	);
}

export default App;
