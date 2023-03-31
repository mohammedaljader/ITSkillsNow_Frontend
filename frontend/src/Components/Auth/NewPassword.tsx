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

export const NewPassword = () => {
	return (
		<form>
			<Card>
				<CardHeader title="New Password" />
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
								helperText="Please specify the email"
								label="Email"
								name="email"
								required
								variant="outlined"
							/>
						</Grid>
						{/* <Grid
							item
							md={20}
							xs={20}
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
						</Grid> */}
					</Grid>
				</CardContent>
				<Divider />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2,
					}}
				>
					<Button
						color="primary"
						variant="contained"
						type="submit"
					>
						Send
					</Button>
				</Box>
			</Card>
		</form>
	);
};
