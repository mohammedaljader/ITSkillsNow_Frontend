import * as React from 'react';
import { TextField, Grid, MenuItem, Typography } from '@mui/material';
import { FileInput } from '../../FileInput/FileInput';
import { CourseType, CourseLanguage } from '../../../Data/course';

interface courseDetailsProps {
	setName: React.Dispatch<React.SetStateAction<string>>;
	setPrice: React.Dispatch<React.SetStateAction<number>>;
	setType: React.Dispatch<React.SetStateAction<string>>;
	setLanguage: React.Dispatch<React.SetStateAction<string>>;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	file: File | null;
	name: string;
	type: string;
	language: string;
	price: number;
}

export default function CourseDetailsForm({
	setName,
	setPrice,
	setType,
	setLanguage,
	setFile,
	file,
	name,
	type,
	language,
	price,
}: courseDetailsProps) {
	return (
		<React.Fragment>
			<Typography
				variant="h6"
				gutterBottom
			>
				Course Details
			</Typography>
			<Grid
				container
				spacing={3}
			>
				<Grid
					item
					xs={12}
				>
					<TextField
						required
						id="CourseName"
						name="CourseName"
						label="Course Name"
						fullWidth
						autoComplete="given-name"
						variant="standard"
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						required
						id="CoursePrice"
						name="CoursePrice"
						label="Course Price"
						type="number"
						fullWidth
						autoComplete="shipping address-line1"
						variant="standard"
						value={price}
						onChange={(event) => setPrice(Number(event.target.value))}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						select
						label="Course Type"
						onChange={(event) => setType(event.target.value)}
						fullWidth
						autoComplete="shipping address-level2"
						value={type}
						variant="standard"
					>
						{Object.values(CourseType).map((course) => (
							<MenuItem
								key={course}
								value={course}
							>
								{course}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextField
						select
						label="Course Language"
						value={language}
						onChange={(event) => setLanguage(event.target.value)}
						fullWidth
						autoComplete="shipping address-level3"
						variant="standard"
					>
						{Object.values(CourseLanguage).map((language) => (
							<MenuItem
								key={language}
								value={language}
							>
								{language}
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid
					item
					xs={12}
				>
					<FileInput
						file={file}
						setFile={setFile}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
