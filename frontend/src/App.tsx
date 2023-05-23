import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Layout from './Components/Layout/Layout';
import CourseListPage from './Pages/CourseListPage';
import Home from './Pages/Home';
import JobListPage from './Pages/JobListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Account } from './Components/User/Account';
import { NewPassword } from './Components/Auth/NewPassword';
import { NotFound } from './Components/MaterialUI/NotFound';
import Checkout from './Components/Course/AddCourse/Checkout';
import AboutUs from './Components/MaterialUI/AboutUs';
import { CourseViewPublicPage } from './Pages/CourseViewPublicPage';

function App() {
	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<Router>
				<Layout>
					<Routes>
						<Route
							path="/"
							element={<Home />}
						/>
						<Route
							path="/profile"
							element={<Account />}
						/>
						<Route
							path="/v1/viewCourse/:courseId"
							element={<CourseViewPublicPage />}
						/>
						<Route
							path="/newpassword"
							element={<NewPassword />}
						/>
						<Route
							path="/signin"
							element={<SignIn />}
						/>
						<Route
							path="/signup"
							element={<SignUp />}
						/>
						<Route
							path="/courses"
							element={<CourseListPage />}
						/>
						<Route
							path="/addCourse"
							element={<Checkout />}
						/>
						<Route
							path="/jobs"
							element={<JobListPage />}
						/>
						<Route
							path="/aboutus"
							element={<AboutUs />}
						/>
						<Route
							path="*"
							element={<NotFound />}
						/>
					</Routes>
				</Layout>
			</Router>
		</>
	);
}

export default App;
