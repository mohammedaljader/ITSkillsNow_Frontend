import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import { AccountProfile } from './AccountProfile';
import AccountProfileDetails from './AccountProfileDetails';
// Typography

export const Account = () => {
	return (
		<Box
			component="main"
			sx={{ flexGrow: 1, py: 1 }}
		>
			<Container maxWidth="lg">
				{/* <Typography
					sx={{ mb: 3 }}
					variant="h4"
				>
					Profile
				</Typography> */}
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
						<AccountProfileDetails />
					</Grid>
					<Grid
						item
						lg={4}
						md={6}
						xs={12}
					>
						<AccountProfile />
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};
