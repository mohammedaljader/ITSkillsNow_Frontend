import React from 'react';
// import CourseApi, { Message } from '../Data/course';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { CardList } from '../Components/MaterialUI/CardList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../Data/Auth';

const JobListPage: React.FC = () => {
	const isAuth = AuthApi.getUser();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	let isMounted = true; // Keep track of whether the component is mounted
	// 	CourseApi.getMessages()
	// 		.then((res) => {
	// 			if (isMounted) {
	// 				// Check if the component is still mounted before updating state
	// 				setMessage(res);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			if (isMounted && err.response.status === 401) {
	// 				// Check if the component is still mounted before navigating
	// 				toast.error('You are not authenticated, please sign in!');
	// 				navigate('/signin');
	// 			}
	// 		});

	// 	return () => {
	// 		isMounted = false; // Set isMounted to false when the component is unmounted
	// 	};
	// }, [navigate]);

	if (!isAuth) return <LoadingComponent />;

	return (
		<main>
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						IT Jobs
					</Typography>
				</Container>
			</Box>
			<CardList />
		</main>
	);
};

export default JobListPage;
