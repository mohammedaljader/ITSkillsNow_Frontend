import React from 'react';
import {
	CircularProgress,
	createStyles,
	Grid,
	makeStyles,
	Theme,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		container: {
			height: '25vh',
		},
		spinnerContainer: {
			verticalAlign: 'middle',
		},
	})
);

export default function LoadingComponent() {
	const classes = useStyles();

	return (
		<Grid
			container
			className={classes.container}
			direction="column"
			alignItems="center"
			justifyContent="center"
		>
			<Grid
				item
				sm={12}
				container
				alignItems="center"
				justifyContent="center"
			>
				<CircularProgress />
			</Grid>
		</Grid>
	);
}
