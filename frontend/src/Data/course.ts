import axios from 'axios';
import AuthHeader from './AuthHeader';

export interface Course {
	courseId: string;
	courseName: string;
}

export interface AddCourse {
	courseName: string;
	courseDescription: string;
	courseImage: File;
	coursePrice: number;
	courseType: string;
	courseLanguage: string;
	isPublished: boolean;
	username: string;
}

interface CourseView {
	courseId: string;
	courseName: string;
	courseDescription: string;
	courseImage: string;
	coursePrice: number;
	courseType: string;
	courseLanguage: string;
	isPublished: boolean;
	username: string;
}

export interface Message {
	messageId: string;
	messageContent: string;
	messageDate: string;
}

export enum CourseType {
	COMPUTER_SCIENCE = 'Computer Science',
	MATHEMATICS = 'Mathematics',
	PHYSICS = 'Physics',
	BIOLOGY = 'Biology',
	HISTORY = 'History',
	LITERATURE = 'Literature',
	BUSINESS = 'Business',
	PSYCHOLOGY = 'Psychology',
	ART = 'Art',
}

export enum CourseLanguage {
	ARABIC = 'Arabic',
	ENGLISH = 'English',
	SPANISH = 'Spanish',
	FRENCH = 'French',
	GERMAN = 'German',
	CHINESE = 'Chinese',
	JAPANESE = 'Japanese',
}

const url = 'http://localhost:8080/api/course';

export default class CourseApi {
	static async getCourses(): Promise<Course[]> {
		const response = await axios.get<Course[]>(url, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}

	static async addCourse(payload: FormData): Promise<CourseView> {
		const response = await axios.post<CourseView>(url, payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}
}
