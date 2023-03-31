
import React, { useState, useEffect } from 'react';
import CourseList from '../Components/Course/CourseList';
import CourseApi, { Course } from '../Data/course';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CourseListPage: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true; // Keep track of whether the component is mounted
	  
		CourseApi.getCourses()
		  .then((res) => {
			if (isMounted) { // Check if the component is still mounted before updating state
			  setCourses(res);
			}
		  })
		  .catch((err) => {
			if (isMounted && err.response.status === 401) { // Check if the component is still mounted before navigating
			  toast.error('You are not authenticated, please sign in!');
			  navigate('/signin');
			}
		  });
	  
		return () => {
		  isMounted = false; // Set isMounted to false when the component is unmounted
		};
	  }, [navigate]);
	  

	const handleAddCourse = () => {
		CourseApi.addCourse({ courseName: 'NewCourse' });
	};

	if (!courses) return <LoadingComponent />;

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
