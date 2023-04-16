import React from 'react';
// import CourseList from '../Components/Course/CourseList';
// import CourseApi, { Course } from '../Data/course';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
import { CardList } from '../Components/MaterialUI/CardList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../Data/Auth';

const CourseListPage: React.FC = () => {
	const isAuth = AuthApi.getUser();
	// const [courses, setCourses] = useState<Course[]>();
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	let isMounted = true; // Keep track of whether the component is mounted

	// 	CourseApi.getCourses()
	// 		.then((res) => {
	// 			if (isMounted) {
	// 				// Check if the component is still mounted before updating state
	// 				setCourses(res);
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

	// const handleAddCourse = () => {
	// 	CourseApi.addCourse({ courseName: 'NewCourse' });
	// };

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
						IT Courses
					</Typography>
				</Container>
			</Box>
			<CardList />
		</main>
	);
};

export default CourseListPage;
