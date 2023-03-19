import React, { useState, useEffect } from 'react';
import CourseList from '../Components/Course/CourseList';
import CourseApi, { Course } from '../Data/course';

const CourseListPage: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>();

	useEffect(() => {
		CourseApi.getCourses().then((res) => {
			setCourses(res);
		});
	}, []);

	const handleAddCourse = () => {
		CourseApi.addCourse({ courseName: 'NewCourse' });
	};

  if(!courses) return <div>No Data!</div>

	return (
		<div>
			<CourseList
				courses={courses}
				onAddCourse={handleAddCourse}
			/>
		</div>
	);
};

export default CourseListPage;
