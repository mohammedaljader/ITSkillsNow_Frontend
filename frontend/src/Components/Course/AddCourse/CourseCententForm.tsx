import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Editor } from '../Editor';

interface courseDetailsProps {
	setContent: React.Dispatch<React.SetStateAction<string>>;
	content: string;
}

export default function CourseCententForm({
	setContent,
	content,
}: courseDetailsProps) {
	return (
		<React.Fragment>
			<Typography
				variant="h6"
				gutterBottom
			>
				Course Content
			</Typography>
			<Grid
				container
				spacing={0}
			>
				<Editor
					setContent={setContent}
					defaultValue={content}
				/>
			</Grid>
		</React.Fragment>
	);
}
