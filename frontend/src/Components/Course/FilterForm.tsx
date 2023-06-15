import React, { useState } from 'react';
import { Button, TextField, Grid, MenuItem } from '@mui/material';
import { CourseType, CourseLanguage } from '../../Data/course';

interface FilterFormProps {
	onSubmit: (filters: FilterValues) => void;
}

interface FilterValues {
	courseName?: string;
	courseType?: CourseType;
	courseLanguage?: CourseLanguage;
	minPrice?: number;
	maxPrice?: number;
}

const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
	const [filters, setFilters] = useState<FilterValues>({});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		onSubmit(filters);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Grid
				container
				spacing={2}
			>
				<Grid
					item
					xs={12}
				>
					<TextField
						name="courseName"
						label="Course Name"
						fullWidth
						value={filters.courseName || ''}
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={6}
				>
					<TextField
						select
						name="courseType"
						label="Course Type"
						fullWidth
						value={filters.courseType || ''}
						onChange={handleChange}
					>
						{Object.values(CourseType).map((type) => (
							<MenuItem
								key={type}
								value={type}
							>
								{type}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid
					item
					xs={6}
				>
					<TextField
						select
						name="courseLanguage"
						label="Course Language"
						fullWidth
						value={filters.courseLanguage || ''}
						onChange={handleChange}
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
					xs={6}
				>
					<TextField
						name="minPrice"
						label="Minimum Price"
						type="number"
						fullWidth
						value={filters.minPrice || ''}
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={6}
				>
					<TextField
						name="maxPrice"
						label="Maximum Price"
						type="number"
						fullWidth
						value={filters.maxPrice || ''}
						onChange={handleChange}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					style={{ marginLeft: '105px' }}
				>
					<Button
						variant="contained"
						color="primary"
						type="submit"
					>
						Apply Filters
					</Button>
				</Grid>
			</Grid>
		</form>
	);
};

export default FilterForm;
