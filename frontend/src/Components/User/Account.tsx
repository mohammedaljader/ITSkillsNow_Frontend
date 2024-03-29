import React, { useState, useEffect } from 'react';
import {
	Box,
	Container,
	Button,
	Grid,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { AccountProfile } from './AccountProfile';
import { AccountProfileDetails } from './AccountProfileDetails';
import AuthApi from '../../Data/Auth';
import LoadingComponent from '../MaterialUI/LoadingComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfileAPI, { UserProfile } from '../../Data/Profile';

export const Account = () => {
	const [open, setOpen] = useState(false);
	const [password, setPassword] = useState(String);
	const [UserProfile, setUserProfile] = useState<UserProfile>();
	const isUser = AuthApi.getUser();
	const navigate = useNavigate();

	useEffect(() => {
		const username = AuthApi.getUsername();
		ProfileAPI.getUserByUsername(username)
			.then((res) => {
				setUserProfile(res);
			})
			.catch((error) => {
				console.error('Error fetching user profile:', error);
			});
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleDelete = () => {
		const username = AuthApi.getUsername();

		AuthApi.deleteme({ username: username, password: password })
			.then(() => {
				toast.success('Account deleted successfully!');
				setTimeout(() => {
					AuthApi.logout();
					navigate('/');
					window.location.reload();
				}, 3000);
			})
			.catch((err) => {
				toast.error('Failed to delete account please try again!');
			});

		setOpen(false);
	};

	if (!isUser || !UserProfile) return <LoadingComponent />;

	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, py: 1 }}
		>
			<Container maxWidth="lg">
				<Typography
					sx={{ mb: 3 }}
					variant="h4"
				>
					Profile
				</Typography>
				<Grid
					container
					spacing={3}
				>
					<Grid
						item
						lg={8}
						md={6}
						xs={12}
					>
						<AccountProfileDetails
							username={UserProfile.username}
							address={UserProfile.address}
							phoneNumber={UserProfile.phoneNumber}
							profession={UserProfile.profession}
						/>
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						xs={12}
					>
						<AccountProfile
						    username={UserProfile.username}
							fullName={UserProfile.fullName}
							address={UserProfile.address}
							profileImage={UserProfile.profileImage}
							email={UserProfile.email}
						/>
						<Button
							style={{ backgroundColor: '#DB2903', marginTop: '10px' }}
							fullWidth
							variant="contained"
							onClick={handleClickOpen}
						>
							Delete account
						</Button>
					</Grid>
				</Grid>
			</Container>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Delete account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To delete your account, please enter your password here.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="password"
						type="password"
						fullWidth
						variant="standard"
						onChange={handleChangePassword}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};
