import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Grid, Card, CardContent } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const useStyles = makeStyles({
	card: {
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	socialMediaIconsContainer: {
		marginTop: '24px',
		display: 'flex',
		gap: '8px',
		cursor: 'pointer',
	},
});

const AboutUs = () => {
	const classes = useStyles();

	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				item
				xs={12}
			>
				<Card className={classes.card}>
					<CardContent>
						<Typography
							variant="h4"
							align="center"
							gutterBottom
						>
							About Us
						</Typography>
						<Typography
							variant="body1"
							align="justify"
							gutterBottom
						>
							We are a team of developers passionate about creating high-quality
							software that meets our clients' needs. Our expertise includes web
							development, mobile app development, and custom software
							development. We are committed to delivering results that exceed
							expectations and provide exceptional customer service.
						</Typography>
						<div className={classes.socialMediaIconsContainer}>
							<LinkedInIcon
								onClick={() => window.open('https://www.linkedin.com/')}
								data-testid="linkedIn-button"
							/>
							<TwitterIcon
								onClick={() => window.open('https://www.twitter.com/')}
								data-testid="twitter-button"
							/>
							<GitHubIcon
								onClick={() => window.open('https://www.facebook.com/')}
								data-testid="github-button"
							/>
						</div>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default AboutUs;
