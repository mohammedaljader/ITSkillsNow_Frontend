import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CourseApi, { CourseView } from '../../Data/Course';
import LoadingComponent from '../MaterialUI/LoadingComponent';
import { useNavigate } from 'react-router-dom';

export const CourseListPublic = () => {
	const [courses, setCourses] = useState<CourseView[]>();
	const navigate = useNavigate();

	const getAllCoursesByUsername = async (): Promise<void> => {
		try {
			const res = await CourseApi.getCourses();
			setCourses(res);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllCoursesByUsername();
	}, []);

	const viewHandler = (courseId: string) => {
		navigate(`/v1/viewCourse/${courseId}`);
	};

	if (!courses) return <LoadingComponent />;

	if (courses.length <= 0)
		return (
			<h1 style={{ textAlign: 'center' }}>There are no courses right now!</h1>
		);

	return (
		<Container
			sx={{ py: 8 }}
			maxWidth="md"
			data-testid="courses"
		>
			<Grid
				container
				spacing={4}
			>
				{courses.map((course) => (
					<Grid
						item
						key={course.courseId}
						xs={12}
						sm={6}
						md={4}
					>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardMedia
								component="img"
								image={course.courseImage}
								alt="course image"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
								>
									Course: {course.courseName}
								</Typography>
								<Typography>Price: {course.coursePrice}€</Typography>
							</CardContent>
							<CardActions>
								<Button
									size="small"
									onClick={() => viewHandler(course.courseId)}
								>
									View
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};
