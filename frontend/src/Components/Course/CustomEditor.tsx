import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FormControl, InputLabel } from '@mui/material';

interface Props {
	value: string;
	onChange: (value: string) => void;
}

const CustomEditor: React.FC<Props> = ({ value, onChange }) => {
	const handleEditorChange = (content: string, editor: any) => {
		onChange(content);
		console.log(content);
	};

	return (
		<FormControl
			variant="outlined"
			className="editor-field"
		>
			<InputLabel id="description-label">Description</InputLabel>
			<Editor
				apiKey="2e6pdz6bna2cz6ei0o4v5xf4z2mhxr0dyt6ytl1yu3befypv"
				value={value}
				onEditorChange={handleEditorChange}
				init={{
					height: 500,
					menubar: false,
					statusbar: false, // Remove the status bar
					toolbar:
						'undo redo | formatselect | image | ' +
						'bold italic backcolor | alignleft aligncenter ' +
						'alignright alignjustify | bullist numlist outdent indent | ' +
						'removeformat | ' + 
						'styleselect | fontselect | fontsizeselect | forecolor backcolor | ' +
						'table | hr | link unlink | image | media | code |',
				}}
			/>
		</FormControl>
	);
};

export default CustomEditor;
