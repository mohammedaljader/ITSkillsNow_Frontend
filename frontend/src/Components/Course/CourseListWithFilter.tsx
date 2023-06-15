import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import FilterForm from './FilterForm';
import CourseListPublic from './CourseListPublic';
import { CourseView } from '../../Data/course';
import CourseApi from '../../Data/course';

const CourseListTest: React.FC = () => {
	const [courses, setCourses] = useState<CourseView[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		CourseApi.getCourses()
			.then((res) => {
				setCourses(res);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error fetching courses:', error);
				setLoading(false);
			});
	}, []);

	const filterCourses = (filters: any) => {
		const queryParams = new URLSearchParams(filters).toString();

		setLoading(true);
		CourseApi.filterCourse(queryParams)
			.then((res) => {
				setCourses(res);
				setLoading(false);
			})
			.catch((error) => {
				console.error('Error filtering courses:', error);
				setLoading(false);
			});
	};

	return (
		<>
			<Typography
				variant="h3"
				style={{ paddingLeft: '300px', paddingBottom: '5px' }}
			>
				Discover new courses
			</Typography>
			<Grid container>
				<Grid
					item
					xs={12}
					md={4}
					style={{ marginTop: '15px' }}
				>
					<Paper style={{ minHeight: '50vh' }}>
						<FilterForm onSubmit={filterCourses} />
					</Paper>
				</Grid>
				<Grid
					item
					xs={12}
					md={7}
				>
					<Paper style={{ minHeight: '50vh' }}>
						<CourseListPublic
							courses={courses}
							loading={loading}
						/>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default CourseListTest;
