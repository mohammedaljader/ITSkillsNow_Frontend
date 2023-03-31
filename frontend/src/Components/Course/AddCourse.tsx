import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIRichTextEditor from 'mui-rte';

const theme = createTheme();

const AddCourse = () => {
	const handleSave = (data: string) => {
		console.log(data);
	};

	return (
		<ThemeProvider theme={theme}>
			<MUIRichTextEditor
				onSave={handleSave}
				inlineToolbar={true}
			/>
		</ThemeProvider>
	);
};

export default AddCourse;
