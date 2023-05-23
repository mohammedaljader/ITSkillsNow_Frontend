import React from 'react';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../Data/Auth';
import ViewCoursePublic from '../Components/Course/ViewCoursePublic';

export const CourseViewPublicPage = () => {
	const isAuth = AuthApi.getUser();

	if (!isAuth) return <LoadingComponent />;

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
