import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Home() {
	const navigate = useNavigate();
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<main>
				{/* Hero unit */}
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
							Discover new IT courses
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="text.secondary"
							paragraph
						>
							Start, switch, or advance your career with more than 5,400
							courses, Professional Certificates, and degrees from world-class
							universities and companies.
						</Typography>
						<Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center"
						>
							<Button
								variant="outlined"
								data-testid="suggested-jobs-button"
								onClick={() => {
									navigate('/jobs');
								}}
							>
								Suggested jobs
							</Button>
							<Button
								variant="contained"
								data-testid="suggested-courses-button"
								onClick={() => {
									navigate('/discover-new-courses');
								}}
							>
								Suggested Courses
							</Button>
						</Stack>
					</Container>
				</Box>
			</main>
		</ThemeProvider>
	);
}
