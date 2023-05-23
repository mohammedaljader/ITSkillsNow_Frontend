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
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import EnrollmentApi from '../../Data/Enrollment';
import AuthApi from '../../Data/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import FavoritesCourseApi from '../../Data/FavoriteCourse';

const ViewCoursePublic = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState<CourseView>();
	const username = AuthApi.getUsername();
	const navigate = useNavigate();

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

	const enrollToCourse = () => {
		if (courseId) {
			EnrollmentApi.enrollToCourse({ courseId: courseId, username: username })
				.then((res) => {
					toast.success('You have enrolled successfully to this course!');
					navigate('/');
				})
				.catch((err) => {
					toast.error('Something went wrong! please try again!');
					console.log(err);
				});
		}
	};

	const addCourseToFavorites = () => {
		if (courseId) {
			FavoritesCourseApi.addCourseToFavorites({
				courseId: courseId,
				username: username,
			})
				.then((res) => {
					toast.success('Course added successfully to your favoirte list!');
					navigate('/');
				})
				.catch((err) => {
					toast.error('Something went wrong! please try again!');
					console.log(err);
				});
		}
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
							<Tooltip title="Enroll to the course">
								<Button
									variant="contained"
									color="primary"
									onClick={() => enrollToCourse()}
								>
									Enroll
								</Button>
							</Tooltip>
							<Tooltip title="Add Course to favorites">
								<IconButton
									color="primary"
									aria-label="Edit"
									onClick={() => addCourseToFavorites()}
								>
									<FavoriteIcon />
								</IconButton>
							</Tooltip>
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
