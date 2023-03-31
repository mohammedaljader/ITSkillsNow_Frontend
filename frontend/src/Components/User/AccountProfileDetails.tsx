import React from 'react';
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
// import { AccountProfile } from './AccountProfile';

export default function AccountProfileDetails() {
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
									helperText="Please specify the first name"
									label="Name"
									name="Name"
									required
									variant="outlined"
								/>
							</Grid>
							<Grid
								item
								md={20}
								xs={20}
							>
								<TextField
									fullWidth
									helperText="Please specify the email address"
									label="Email Address"
									name="email"
									required
									// defaultValue={props.user.email}
									variant="outlined"
								/>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
							>
								<TextField
									fullWidth
									helperText="Please specify the password"
									label="Password"
									name="Password"
									type="password"
									required
									variant="outlined"
								/>
							</Grid>
							<Grid
								item
								md={6}
								xs={12}
							>
								<TextField
									fullWidth
									helperText="Please specify the address"
									label="Address"
									name="address"
									required
									// defaultValue={props.user.address}
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
						>
							Save details
						</Button>
					</Box>
				</Card>
			</form>
		</>
	);
}
