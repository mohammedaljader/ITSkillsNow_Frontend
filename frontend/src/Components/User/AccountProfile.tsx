import React, { useState } from 'react';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';
import ProfileAPI from '../../Data/Profile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { toast } from 'react-toastify';

interface UserProfileProps {
	username: string;
	fullName: string;
	email: string;
	address: string;
	profileImage: string;
}

export const AccountProfile: React.FC<UserProfileProps> = ({
	username,
	fullName,
	address,
	profileImage,
	email,
}) => {
	const [ProfileImage, setProfileImage] = useState<string>(profileImage);

	const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			toast.info('you did not upload a picture!');
			return;
		}
		const data = new FormData();
		data.append('username', username);
		data.append('profileImage', file);

		ProfileAPI.addProfileImage(data)
			.then((res) => {
				toast.success('Profile picture updated successfully!');
				setProfileImage(res);
			})
			.catch((error) => {
				console.error('Error uploading user profile picture:', error);
			});
	};

	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<Avatar
						src={ProfileImage}
						sx={{
							height: 64,
							mb: 2,
							width: 64,
						}}
					/>
					<Typography
						color="textPrimary"
						gutterBottom
						variant="h5"
					>
						{fullName}
					</Typography>
					<Typography
						color="textSecondary"
						variant="body2"
					>
						Email: {email}
					</Typography>
					<Typography
						color="textSecondary"
						variant="body2"
					>
						Address: {address}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<input
					accept="image/*"
					id="upload-button"
					type="file"
					style={{ display: 'none' }}
					onChange={handleUpload}
				/>
				<label htmlFor="upload-button">
					<Button
						component="span"
						style={{
							padding: 0,
							minWidth: 'unset',
							backgroundColor: 'transparent',
							boxShadow: 'none',
							marginLeft: '75px',
						}}
					>
						<CloudUploadIcon style={{ marginRight: '0.5rem' }} />
						Upload Picture
					</Button>
				</label>
			</CardActions>
		</Card>
	);
};
