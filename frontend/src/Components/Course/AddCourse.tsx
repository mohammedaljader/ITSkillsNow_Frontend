import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CustomEditor from './CustomEditor';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			marginBottom: theme.spacing(2),
		},
	},
	editor: {
		marginTop: theme.spacing(2),
	},
}));

const AddCourse: React.FC = () => {
	const classes = useStyles();
	const [courseName, setCourseName] = useState('');
	const [courseSalary, setCourseSalary] = useState(0);
	const [courseType, setCourseType] = useState('');
	const [description, setDescription] = useState('');

	const handleCourseNameChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCourseName(event.target.value);
	};

	const handleCourseSalaryChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCourseSalary(parseFloat(event.target.value));
	};

	const handleCourseTypeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setCourseType(event.target.value);
	};

	const handleDescriptionChange = (value: string) => {
		setDescription(value);
	};

	const courseTypes = [
		{
			value: 'beginner',
			label: 'Beginner',
		},
		{
			value: 'intermediate',
			label: 'Intermediate',
		},
		{
			value: 'advanced',
			label: 'Advanced',
		},
	];

	return (
		<Box mt={2}>
			<form
				className={classes.root}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="course-name"
					label="Course Name"
					value={courseName}
					onChange={handleCourseNameChange}
				/>
				<TextField
					id="course-salary"
					label="Course Salary"
					type="number"
					value={courseSalary}
					onChange={handleCourseSalaryChange}
				/>
				<TextField
					id="course-type"
					select
					label="Course Type"
					value={courseType}
					onChange={handleCourseTypeChange}
				>
					{courseTypes.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
						>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<CustomEditor
					value={description}
					onChange={handleDescriptionChange}
				/>
			</form>
		</Box>
	);
};

export default AddCourse;
