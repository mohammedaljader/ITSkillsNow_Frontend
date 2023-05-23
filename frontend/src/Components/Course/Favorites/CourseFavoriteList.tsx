import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../../../Data/Auth';
import LoadingComponent from '../../MaterialUI/LoadingComponent';
import { toast } from 'react-toastify';
import FavoritesCourseApi, {
	FavoritesView,
} from '../../../Data/FavoriteCourse';
import { useNavigate } from 'react-router-dom';
import EnrollmentApi from '../../../Data/Enrollment';

export const CourseFavoriteList = () => {
	const [favorites, setFavorites] = useState<FavoritesView[]>();
	const username = AuthApi.getUsername();
	const navigate = useNavigate();

	const getAllFavoritesByUsername = async (username: string): Promise<void> => {
		try {
			const res = await FavoritesCourseApi.getAllFavoritesByUsername(username);
			setFavorites(res);
		} catch (err) {
			toast.error('Something went wrong!');
			console.log(err);
		}
	};

	const deleteHandler = (favoriteId: string) => {
		FavoritesCourseApi.deleteFavoriteFromList(favoriteId)
			.then((res) => {
				toast.success(
					'Course has deleted successfully from your favorite list!'
				);
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong!');
			});
	};

	const enrollHandler = (courseId: string) => {
		EnrollmentApi.enrollToCourse({
			courseId: courseId,
			username: username,
		})
			.then((res) => {
				toast.success('You have enrolled successfully to this course!');
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				toast.error('Something went wrong!');
			});
	};

	const viewHandler = (courseId: string) => {
		navigate(`/v1/viewCourse/${courseId}`);
	};

	useEffect(() => {
		getAllFavoritesByUsername(username);
	}, [username]);

	if (!favorites) return <LoadingComponent />;

	if (favorites.length <= 0)
		return (
			<h1 style={{ textAlign: 'center' }}>There are no favorites right now!</h1>
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
				{favorites.map((favorite) => (
					<Grid
						item
						key={favorite.favoriteDate}
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
								image={favorite.courseView.courseImage}
								alt="course image"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									gutterBottom
									variant="h5"
									component="h2"
								>
									Course: {favorite.courseView.courseName}
								</Typography>
								<Typography>Saved Date: {favorite.favoriteDate}</Typography>
								<Typography>
									Saved Time: {favorite.favoriteTime.slice(0, 5)}
								</Typography>
							</CardContent>

							<CardActions>
								<Button
									size="small"
									onClick={() => viewHandler(favorite.courseView.courseId)}
								>
									View
								</Button>
								<Button
									size="small"
									onClick={() => deleteHandler(favorite.favoriteId)}
								>
									Delete
								</Button>
								<Button
									size="small"
									onClick={() => enrollHandler(favorite.courseView.courseId)}
								>
									Enroll
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};
