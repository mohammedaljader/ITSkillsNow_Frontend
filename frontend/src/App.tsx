import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import Layout from './Components/Layout/Layout';
import CourseListPage from './Pages/CourseListPage';
import Home from './Pages/Home';
import MessageListPage from './Pages/MessageListPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Account } from './Components/User/Account';
import { NewPassword } from './Components/Auth/NewPassword';
import { NotFound } from './Components/MaterialUI/NotFound';
// import AddCourse from './Components/Course/AddCourse';

function App() {
	return (
		<Layout>
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
					{/* <Route
						path="/addCourse"
						element={<AddCourse />}
					/> */}
					<Route
						path="/jobs"
						element={<MessageListPage />}
					/>
					<Route
						path="*"
						element={<NotFound />}
					/>
				</Routes>
			</Router>
		</Layout>
	);
}

export default App;
