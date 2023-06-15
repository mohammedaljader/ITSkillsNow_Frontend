import React from 'react';
import { CardList } from '../Components/MaterialUI/CardList';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const JobListPage: React.FC = () => {
	return (
		<main>
			<Box
				sx={{
					bgcolor: 'background.paper',
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h2"
						align="center"
						color="text.primary"
						gutterBottom
					>
						IT Jobs
					</Typography>
				</Container>
			</Box>
			<CardList />
		</main>
	);
};

export default JobListPage;
