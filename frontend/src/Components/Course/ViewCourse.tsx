import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Box,
	Button,
	Grid,
	Typography,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import LoadingComponent from '../MaterialUI/LoadingComponent';
import CourseApi, { CourseView } from '../../Data/course';
import parse from 'html-react-parser';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewCourse = () => {
	const { courseId } = useParams();
	const [course, setCourse] = useState<CourseView>();
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const navigateToUpdateCourse = (courseId: string) => {
		navigate(`/updateCourse/${courseId}`);
	};

	const deleteHandler = (courseId: string) => {
		CourseApi.deleteCourse(courseId)
			.then(() => {
				toast.success('Course deleted successfully!');
				navigate('/courses');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong... please try again!');
			});
	};

	const handleClose = () => {
		setOpen(false);
	};

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
							<Tooltip title="Edit Course">
								<IconButton
									color="primary"
									aria-label="Edit"
									onClick={() => navigateToUpdateCourse(course.courseId)}
								>
									<EditIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="Delete Course">
								<IconButton
									color="primary"
									aria-label="Delete"
									onClick={handleClickOpen}
								>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
							<Tooltip title="The registered users">
								<IconButton
									color="primary"
									aria-label="Registered users"
								>
									<PeopleIcon />
								</IconButton>
							</Tooltip>
						</Box>
					</CardContent>
				</Card>
			</Grid>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Delete course</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this course?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={() => deleteHandler(course.courseId)}>Delete</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};

export default ViewCourse;
