import * as React from 'react';
import { useState } from 'react';
import {
	Button,
	TextField,
	MenuItem,
	Typography,
	Card,
	CardContent,
	Box,
} from '@mui/material';
import { Editor } from './Editor';

interface CourseFormProps {
	onSubmit?: (formData: {
		title: string;
		description: string;
		category: string;
	}) => void;
}

export const AddCourse: React.FC<CourseFormProps> = ({ onSubmit }) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [category, setCategory] = useState('');

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// onSubmit({ title, description, category });
	};

	return (
		<Box sx={{ backgroundColor: '#fff' }}>
			<Card>
				<CardContent>
					<Typography
						variant="h5"
						component="h2"
						gutterBottom
					>
						Add Course
					</Typography>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							label="Description"
							value={description}
							onChange={(event) => setDescription(event.target.value)}
							fullWidth
							margin="normal"
							required
						/>
						<TextField
							select
							label="Category"
							value={category}
							onChange={(event) => setCategory(event.target.value)}
							fullWidth
							margin="normal"
							required
						>
							<MenuItem value="web">Web Development</MenuItem>
							<MenuItem value="mobile">Mobile Development</MenuItem>
							<MenuItem value="game">Game Development</MenuItem>
						</TextField>
						<Editor text='Description' setContent={setCategory}/>
						<Button
							variant="contained"
							type="submit"
							color="primary"
							style={{ marginTop: '15px' }}
						>
							Submit
						</Button>
					</form>
				</CardContent>
			</Card>
		</Box>
	);
};
