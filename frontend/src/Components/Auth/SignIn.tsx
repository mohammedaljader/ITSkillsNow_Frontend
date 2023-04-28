import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AuthApi from '../../Data/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const SignIn = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		AuthApi.signIn({ username: username, password: password })
			.then((res) => {
				// console.log(res.accessToken);
				toast.success('You signed in successfully!');
				setTimeout(() => {
					navigate('/');
					window.location.reload();
				}, 3000);
			})
			.catch((err) => {
				// console.log(err.response.status);
				toast.error('Wrong username or password!');
			});
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
		>
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
					Sign in
				</Typography>
				<Box
					component="form"
					onSubmit={handleSubmit}
					noValidate
					sx={{ mt: 1 }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoComplete="username"
						autoFocus
						data-testid="username-field"
						onChange={(event) => setUsername(event.target.value)}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						data-testid="password-field"
						onChange={(event) => setPassword(event.target.value)}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value="remember"
								color="primary"
							/>
						}
						data-testid="rememberme-radiobutton"
						label="Remember me"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-testid="signin-button"
					>
						Sign In
					</Button>
					<Grid container>
						<Grid
							item
							xs
						>
							<Link
								href="/newpassword"
								variant="body2"
								data-testid="forgetpassword-button"
							>
								Forgot password?
							</Link>
						</Grid>
						<Grid item>
							<Link
								href="/signup"
								variant="body2"
								data-testid="signup-button"
							>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
};
