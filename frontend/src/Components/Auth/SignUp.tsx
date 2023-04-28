import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthApi from '../../Data/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const theme = createTheme();

const signUpValidations = (data: FormData): boolean => {
	const firstName = data.get('firstName') as string;
	const lastName = data.get('lastName') as string;
	const email = data.get('email') as string;
	const password = data.get('password') as string;
	const username = data.get('username') as string;

	// Check for empty values
	if (!firstName || !lastName || !email || !password || !username) {
		toast.info("Please fill out all fields.")
		return false;
	}

	// Check for password length
	if (password.length < 6) {
		toast.info("Password must be at least 6 characters long.")
		return false;
	}

	// Check for valid email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		toast.info("Please enter a valid email address.")
		return false;
	}

	// All validations passed
	return true;
};

export default function SignUp() {
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		const firstName = data.get('firstName') as string;
		const lastName = data.get('lastName') as string;
		const email = data.get('email') as string;
		const password = data.get('password') as string;
		const username = data.get('username') as string;

		const fullName = firstName + ' ' + lastName;

		if (signUpValidations(data)) {
			AuthApi.signUp({
				fullName: fullName,
				username: username,
				email: email,
				password: password,
			})
				.then(() => {
					toast.success("Account created succcessfully")
					navigate('/signin');
				})
				.catch((err) => {
					toast.error("Failed to create an account, please try again!")
				});
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container
				component="main"
				maxWidth="xs"
			>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography
						component="h1"
						variant="h5"
					>
						Sign up
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid
							container
							spacing={2}
						>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									data-testid="firstname-field"
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={6}
							>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									data-testid="lastname-field"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									id="username"
									label="Username"
									name="username"
									autoComplete="username"
									data-testid="username-field"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									data-testid="email-field"
								/>
							</Grid>
							<Grid
								item
								xs={12}
							>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									data-testid="password-field"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							data-testid="signup-button"
						>
							Sign Up
						</Button>
						<Grid
							container
							justifyContent="flex-end"
						>
							<Grid item>
								<Link
									href="/signin"
									variant="body2"
									data-testid="signin-button"
								>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
