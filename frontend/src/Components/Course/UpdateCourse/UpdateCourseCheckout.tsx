import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	Container,
	CssBaseline,
	Paper,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CourseDetailsForm from './CourseDetailsForm';
import CourseCententForm from './CourseCententForm';
import Review from './Review';
import { toast } from 'react-toastify';
import AuthApi from '../../../Data/Auth';
import CourseApi, { CourseView } from '../../../Data/Course';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface courseProps {
	setContent: React.Dispatch<React.SetStateAction<string>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setPrice: React.Dispatch<React.SetStateAction<number>>;
	setType: React.Dispatch<React.SetStateAction<string>>;
	setLanguage: React.Dispatch<React.SetStateAction<string>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	name: string;
	content: string;
	file: File | null;
	type: string;
	language: string;
	price: number;
}

const steps = ['Course Details', 'Course Content', 'Review your course'];

function getStepContent(step: number, props: courseProps) {
	switch (step) {
		case 0:
			return (
				<CourseDetailsForm
					setName={props.setName}
					setPrice={props.setPrice}
					setType={props.setType}
					setLanguage={props.setLanguage}
					setFile={props.setFile}
					file={props.file}
					name={props.name}
					price={props.price}
					type={props.type}
					language={props.language}
				/>
			);
		case 1:
			return (
				<CourseCententForm
					setContent={props.setContent}
					content={props.content}
				/>
			);
		case 2:
			return (
				<Review
					name={props.name}
					content={props.content}
				/>
			);
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

export default function UpdateCourseCheckout() {
	const { courseId } = useParams();
	const [activeStep, setActiveStep] = useState(0);
	const [name, setName] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [type, setType] = useState<string>('');
	const [language, setLanguage] = useState<string>('');
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string>('');
	const [price, setPrice] = useState<number>(0);
	const [courseUpdated, setCourseUpdated] = useState<boolean>(false);
	const username = AuthApi.getUsername();

	const getCourseByCourseId = async (courseId: string): Promise<void> => {
		try {
			const res = await CourseApi.getCourseByCourseId(courseId);
			setName(res.courseName);
			setContent(res.courseDescription);
			setType(res.courseType);
			setLanguage(res.courseLanguage);
			setPrice(res.coursePrice);
			setImage(res.courseImage);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (courseId === undefined) return;
		getCourseByCourseId(courseId);
	}, [courseId]);

	const props: courseProps = {
		setContent: setContent,
		setName: setName,
		setLanguage: setLanguage,
		setType: setType,
		setPrice: setPrice,
		setFile: setFile,
		name: name,
		content: content,
		file: file,
		type: type,
		language: language,
		price: price,
	};

	const handleNext = () => {
		if (activeStep + 1 === steps.length) {
			if (
				name === '' ||
				content === '' ||
				type === '' ||
				language === '' ||
				price === 0 ||
				courseId === undefined ||
				username === ''
			) {
				toast.error('All field are required!');
				return;
			}

			if (file !== null) {
				const data = new FormData();
				data.append('courseId', courseId);
				data.append('courseName', name);
				data.append('courseDescription', content);
				data.append('courseImage', file);
				data.append('coursePrice', price.toString());
				data.append('courseType', type);
				data.append('courseLanguage', language);
				data.append('isPublished', 'true');
				data.append('username', username);
				CourseApi.updateCourse(data)
					.then((res) => {
						toast.success('Course updated successfully!');
						setCourseUpdated(true);
					})
					.catch((err) => {
						console.log(err);
						toast.error('Error which updating course, please try again!');
						setCourseUpdated(false);
					});
			} else {
				const updatedCourse: CourseView = {
					courseId: courseId,
					courseName: name,
					courseDescription: content,
					courseImage: image,
					coursePrice: price,
					courseType: type,
					courseLanguage: language,
					isPublished: true,
					username: username,
				};
				CourseApi.updateCourseWithoutImage(updatedCourse)
					.then((res) => {
						toast.success('Course updated successfully!');
						setCourseUpdated(true);
					})
					.catch((err) => {
						console.log(err);
						toast.error('Error which updating course, please try again!');
						setCourseUpdated(false);
					});
			}
		}
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container
				component="main"
				maxWidth="xl"
				sx={{ mb: 4 }}
			>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography
						component="h1"
						variant="h4"
						align="center"
					>
						Update Course
					</Typography>
					<Stepper
						activeStep={activeStep}
						sx={{ pt: 3, pb: 5 }}
					>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Typography
								variant="h5"
								gutterBottom
							>
								{courseUpdated ? 'Course updated successfully' : 'Oops!'}
							</Typography>
							{courseUpdated ? (
								<Typography variant="subtitle1">
									Your course is updated successfully. You can now manage and
									add content to your course.{' '}
									<Link to="/courses">Go to My Courses</Link>
								</Typography>
							) : (
								<Typography variant="subtitle1">
									Please try again.{' '}
									<Link
										onClick={() => window.location.reload()}
										to={`/updateCourse/${courseId}`}
									>
										Update Course
									</Link>
								</Typography>
							)}
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(activeStep, props)}
							<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
								{activeStep !== 0 && (
									<Button
										onClick={handleBack}
										sx={{ mt: 3, ml: 1 }}
									>
										Back
									</Button>
								)}
								<Button
									variant="contained"
									onClick={handleNext}
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? 'Update Course' : 'Next'}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</Paper>
			</Container>
		</ThemeProvider>
	);
}
