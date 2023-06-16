import React, { useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@mui/material';
import ProfileAPI from '../../Data/Profile';

interface UserProfileProps {
	username: string;
	address: string;
	phoneNumber: string;
	profession: string;
}

export const AccountProfileDetails: React.FC<UserProfileProps> = ({
	address,
	phoneNumber,
	profession,
	username,
}) => {
	const [Address, setAddress] = useState<string>(address);
	const [PhoneNumber, setPhoneNumber] = useState<string>(phoneNumber);
	const [Profession, setProfession] = useState<string>(profession);

	const changeProfile = (event: React.FormEvent) => {
		event.preventDefault();
		ProfileAPI.updateProfile({
			username: username,
			address: Address,
			phoneNumber: PhoneNumber,
			profession: Profession,
		})
			.then((res) => {
				setAddress(res.address);
				setPhoneNumber(res.phoneNumber);
				setProfession(res.profession);
			})
			.catch((error) => {
				console.error('Error updating user profile:', error);
			});
	};

	return (
		<>
			{/* <AccountProfile /> */}
			<form>
				<Card>
					<CardHeader
						subheader="The information can be edited"
						title="Profile"
					/>
					<Divider />
					<CardContent>
						<Grid
							container
							spacing={3}
						>
							<Grid
								item
								md={20}
								xs={20}
							>
								<TextField
									fullWidth
									helperText="Please specify the address"
									label="Address"
									name="address"
									required
									defaultValue={Address}
									variant="outlined"
									onChange={(event) => setAddress(event.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={20}
								xs={20}
							>
								<TextField
									fullWidth
									helperText="Please specify the phoneNumber"
									label="PhoneNumber"
									name="PhoneNumber"
									required
									defaultValue={PhoneNumber}
									variant="outlined"
									onChange={(event) => setPhoneNumber(event.target.value)}
								/>
							</Grid>
							<Grid
								item
								md={20}
								xs={20}
							>
								<TextField
									fullWidth
									helperText="Please specify the profession"
									label="profession"
									name="Profession"
									required
									defaultValue={Profession}
									onChange={(event) => setProfession(event.target.value)}
									variant="outlined"
								/>
							</Grid>
						</Grid>
					</CardContent>
					<Divider />
					<Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
						<Button
							style={{ background: '#032892' }}
							variant="contained"
							type="submit"
							onClick={changeProfile}
						>
							Save details
						</Button>
					</Box>
				</Card>
			</form>
		</>
	);
};
