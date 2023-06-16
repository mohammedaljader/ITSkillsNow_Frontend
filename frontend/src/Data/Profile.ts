import axios from 'axios';
import AuthHeader from './AuthHeader';

export interface UserProfile {
	username: string;
	fullName: string;
	email: string;
	address: string;
	profileImage: string;
	phoneNumber: string;
	profession: string;
}

export interface UpdateUserProfile {
	username: string;
	address: string;
	phoneNumber: string;
	profession: string;
}

const getUrl = (param: string): string => {
	return `${process.env.REACT_APP_Backend_Url}/api/user/${param}`;
};

export default class ProfileAPI {
	static async getUserByUsername(username: string): Promise<UserProfile> {
		const response = await axios.get<UserProfile>(
			getUrl('profile/').concat(username),
			{
				headers: { Authorization: AuthHeader() },
			}
		);
		return response.data;
	}

	static async addProfileImage(payload: FormData): Promise<string> {
		const response = await axios.post<string>(getUrl('profile'), payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}

	static async deleteProfileImage(username: string): Promise<string> {
		const response = await axios.delete<string>(
			getUrl('profile/').concat(username),
			{
				headers: { Authorization: AuthHeader() },
			}
		);
		return response.data;
	}

	static async updateProfile(payload: UpdateUserProfile): Promise<UserProfile> {
		const response = await axios.put<UserProfile>(getUrl('profile'), payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}
}
