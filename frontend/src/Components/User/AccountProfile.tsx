import React, { useRef, useState } from 'react';
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
	const [uploadButtonDisabled, setUploadButtonDisabled] = useState(false);
	const [ProfileImage, setProfileImage] = useState<string>(profileImage);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleUploadButtonClick = () => {
		if (!uploadButtonDisabled && fileInputRef.current) {
			fileInputRef.current.click();
			setUploadButtonDisabled(true);
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
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
						{email}
					</Typography>
					<Typography
						color="textSecondary"
						variant="body2"
					>
						{address}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<input
					accept="image/*"
					id="upload-image-input"
					type="file"
					style={{ display: 'none' }}
					ref={fileInputRef}
					onChange={handleImageUpload}
				/>
				<label htmlFor="upload-image-input">
					<Button
						sx={{ color: '#032892', marginLeft: '60px' }}
						fullWidth
						variant="text"
						component="span"
						onClick={handleUploadButtonClick}
						disabled={uploadButtonDisabled}
					>
						Upload picture
					</Button>
				</label>
			</CardActions>
		</Card>
	);
};
