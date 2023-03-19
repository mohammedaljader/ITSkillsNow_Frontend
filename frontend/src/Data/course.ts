import axios from 'axios';

export interface Course {
	courseId: string;
	courseName: string;
}

interface CreateCourse {
	courseName: string;
}

export interface Message{
    messageId: string;
    messageContent: string;
    messageDate: string;
}

const url = 'http://localhost:8080/api/course';

export default class CourseApi {
	static async getCourses(): Promise<Course[]> {
		const response = await axios.get<Course[]>(url);
		return response.data;
	}

	static async addCourse(payload: CreateCourse): Promise<boolean> {
		const response = await axios.post<boolean>(url, payload);
		return response.data;
	}

    static async getMessages(): Promise<Message[]> {
        const messageUrl = 'http://localhost:8080/api/job/messages'
		const response = await axios.get<Message[]>(messageUrl);
		return response.data;
	}
}
