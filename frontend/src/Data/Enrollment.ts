import axios from 'axios';
import AuthHeader from './AuthHeader';
import { CourseView } from './Course';

export interface EnrollForCourse {
	courseId: string;
	username: string;
}

export interface EnrollmentView {
	enrollmentDate: string;
	enrollmentTime: string;
	courseView: CourseView;
}

const url = 'http://localhost:8080/api/course/enrollment';

export default class EnrollmentApi {
	static async enrollToCourse(payload: EnrollForCourse): Promise<boolean> {
		const response = await axios.post<boolean>(url, payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}

	static async getAllEnrollmentsByUsername(
		username: string
	): Promise<EnrollmentView[]> {
		const response = await axios.get<EnrollmentView[]>(
			url.concat(`/${username}`),
			{
				headers: { Authorization: AuthHeader() },
			}
		);
		return response.data;
	}
}
