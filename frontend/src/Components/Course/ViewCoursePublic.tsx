import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Typography,
	Grid,
	Card,
	CardContent,
	Button,
	Box,
} from '@mui/material';
import LoadingComponent from '../MaterialUI/LoadingComponent';
import CourseApi, { CourseView } from '../../Data/course';
import parse from 'html-react-parser';
import Tooltip from '@mui/material/Tooltip';

const ViewCoursePublic = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState<CourseView>();

	useEffect(() => {
		const getCourseByCourseId = async (courseId: string): Promise<void> => {
			try {
				const res = await CourseApi.getCourseByCourseId(courseId);
				setCourse(res);
			} catch (err) {
				console.log(err);
			}
		};

		if (courseId) {
			getCourseByCourseId(courseId);
		}
	}, [courseId]);

	if (!course) {
		return <LoadingComponent />;
	}

	const convertHTMLToJSX = (html: string) => {
		return parse(html);
	};

	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				xs={12}
			>
				<Card>
					<CardContent>
						<Typography
							variant="h5"
							gutterBottom
						>
							Course Name: {course.courseName}
						</Typography>
						<Typography
							variant="subtitle1"
							gutterBottom
						>
							Course Type: {course.courseType}
						</Typography>
						<Typography
							variant="subtitle1"
							gutterBottom
						>
							Course Language: {course.courseLanguage}
						</Typography>
						<Typography
							variant="subtitle1"
							gutterBottom
						>
							Course Price: {course.coursePrice}€
						</Typography>
						<Tooltip title="Course Description">
							<Typography
								variant="body2"
								color="textSecondary"
								gutterBottom
							>
								{convertHTMLToJSX(course.courseDescription ?? '')}
							</Typography>
						</Tooltip>
						<Box
							display="flex"
							justifyContent="center"
							marginTop={2}
						>
							<Button
								variant="contained"
								color="primary"
							>
								Enroll
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Grid>

			{/* <Grid
				item
				xs={12}
			>
				<Box
					display="flex"
					justifyContent="center"
					marginTop={2}
				>
					<Button
						variant="contained"
						color="primary"
					>
						Enroll
					</Button>
				</Box>
			</Grid> */}
		</Grid>
	);
};

export default ViewCoursePublic;
