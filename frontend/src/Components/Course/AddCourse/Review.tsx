import * as React from 'react';
import { Typography, Grid } from '@mui/material';

interface courseReviewProps {
	content: string;
	name: string;
}

export default function Review({ name, content }: courseReviewProps) {
	function convertHTMLToJSX(html: string) {
		return { __html: html };
	}

	return (
		<React.Fragment>
			<Typography
				variant="h6"
				gutterBottom
			>
				Course Name : {name}
			</Typography>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
				>
					<Typography
						variant="h6"
						gutterBottom
						sx={{ mt: 2 }}
					>
						Course Content
					</Typography>
					<div
						dangerouslySetInnerHTML={convertHTMLToJSX(content)}
						style={{
							backgroundColor: '#E9ECEF',
						}}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
