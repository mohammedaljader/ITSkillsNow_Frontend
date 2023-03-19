import React from 'react';
import './css/CourseList.css';
import { Course } from '../../Data/course';

interface Props {
	courses: Course[];
	onAddCourse: () => void;
}

const CourseList: React.FC<Props> = ({ courses, onAddCourse }) => {
	return (
		<div className="course-list">
			<h2>Courses</h2>
			<ul>
				{courses.map((course) => (
					<li key={course.courseId}>{course.courseName}</li>
				))}
			</ul>
			<button onClick={onAddCourse}>Add Course</button>
		</div>
	);
};

export default CourseList;
