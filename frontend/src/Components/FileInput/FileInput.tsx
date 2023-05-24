import React from 'react';
import { Button, styled, InputLabel, Input } from '@mui/material';

const MyInputLabel = styled(InputLabel)({
	display: 'block',
	marginTop: '2px',
	marginLeft: '15px',
});

const Container = styled('div')({
	display: 'flex',
	alignItems: 'center',
});

interface fileProps {
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	file: File | null;
}

export const FileInput = ({ file, setFile }: fileProps) => {
	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = event.target.files;
		if (fileList && fileList.length > 0) {
			const selectedFile = fileList[0];
			setFile(selectedFile);
		}
	};

	return (
		<Container>
			<Input
				id="upload-file"
				type="file"
				style={{ display: 'none' }}
				onChange={handleFileChange}
				inputProps={{ accept: 'image/*' }}
			/>
			<Button
				component="label"
				htmlFor="upload-file"
			>
				Upload Image
			</Button>
			<MyInputLabel htmlFor="upload-file">{file ? file.name : ''}</MyInputLabel>
		</Container>
	);
};
