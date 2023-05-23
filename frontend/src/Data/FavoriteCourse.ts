import axios from 'axios';
import AuthHeader from './AuthHeader';
import { CourseView } from './course';

export interface AddCourseToFavorites {
	courseId: string;
	username: string;
}

export interface FavoritesView {
	favoriteId: string;
	favoriteDate: string;
	favoriteTime: string;
	courseView: CourseView;
}

const url = 'http://localhost:8080/api/course/favorites';

export default class FavoritesCourseApi {
	static async addCourseToFavorites(
		payload: AddCourseToFavorites
	): Promise<boolean> {
		const response = await axios.post<boolean>(url, payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}

	static async getAllFavoritesByUsername(
		username: string
	): Promise<FavoritesView[]> {
		const response = await axios.get<FavoritesView[]>(
			url.concat(`/${username}`),
			{
				headers: { Authorization: AuthHeader() },
			}
		);
		return response.data;
	}

	static async deleteFavoriteFromList(favoriteId: string): Promise<boolean> {
		const response = await axios.delete<boolean>(url.concat(`/${favoriteId}`), {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}
}
