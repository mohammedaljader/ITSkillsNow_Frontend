import React from 'react';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AuthApi from '../Data/Auth';
import { CourseList } from '../Components/Course/CouseList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseListPage: React.FC = () => {
	const isAuth = AuthApi.getUser();
	const naviagte = useNavigate();

	if (!isAuth) return <LoadingComponent />;

	const navigateToAddCourse = () => {
		naviagte('/addCourse');
	};

	return (
		<main>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					bgcolor: 'background.paper',
					pt: 2,
					pb: 2,
				}}
			>
				<Typography
					component="h1"
					variant="h3"
					align="center"
					color="text.primary"
					style={{ marginLeft: '200px' }}
					gutterBottom
				>
					IT Courses
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigateToAddCourse()}
				>
					Add Course
				</Button>
			</Box>
			<CourseList />
		</main>
	);
};

export default CourseListPage;
