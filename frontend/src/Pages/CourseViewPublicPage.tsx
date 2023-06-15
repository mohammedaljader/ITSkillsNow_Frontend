import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../Data/Auth';
import ViewCoursePublic from '../Components/Course/ViewCoursePublic';
import { useNavigate } from 'react-router-dom';

export const CourseViewPublicPage = () => {
	const isAuth = AuthApi.getUser();
	const navigate = useNavigate();

	if (!isAuth) {
		navigate('/signin');
	}

	return (
		<main>
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 1,
					pb: 1,
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
						Coure View
					</Typography>
				</Container>
			</Box>
			<ViewCoursePublic />
		</main>
	);
};
