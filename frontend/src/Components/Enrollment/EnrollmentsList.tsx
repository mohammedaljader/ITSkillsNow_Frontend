import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../../Data/Auth';
import LoadingComponent from '../MaterialUI/LoadingComponent';
import EnrollmentApi, { EnrollmentView } from '../../Data/Enrollment';
import { toast } from 'react-toastify';

export const EnrollmentsList = () => {
	const [enrollments, setEnrollments] = useState<EnrollmentView[]>();
	const username = AuthApi.getUsername();

	const getAllEnrollmentsByUsername = async (
		username: string
	): Promise<void> => {
		try {
			const res = await EnrollmentApi.getAllEnrollmentsByUsername(username);
			setEnrollments(res);
		} catch (err) {
			toast.error('Something went wrong!');
			console.log(err);
		}
	};

	useEffect(() => {
		getAllEnrollmentsByUsername(username);
	}, [username]);

	if (!enrollments) return <LoadingComponent />;

	if (enrollments.length <= 0)
		return (
			<h1 style={{ textAlign: 'center' }}>There are no enrollments right now!</h1>
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
				{enrollments.map((enrollment) => (
					<Grid
						item
						key={enrollment.enrollmentDate}
						xs={12}
						sm={6}
						md={5}
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
								image={enrollment.courseView.courseImage}
								alt="course image"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
								>
									Course: {enrollment.courseView.courseName}
								</Typography>
								<Typography>
									Enrollment Date: {enrollment.enrollmentDate}
								</Typography>
								<Typography>
									Enrollment Time: {enrollment.enrollmentTime.slice(0, 5)}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small">Continue</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};
