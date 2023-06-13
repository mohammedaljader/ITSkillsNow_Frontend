import axios from 'axios';
import AuthHeader from './AuthHeader';

interface signin {
	username: string;
	password: string;
}

interface signup {
	fullName: string;
	username: string;
	email: string;
	password: string;
}

interface deleteAccount {
	username: string;
	password: string;
}

interface SignInWithCode {
	username: string;
	code: string;
}

interface tokenResponse {
	accessToken: string;
}

interface User {
	accessToken: string;
	refreshToken: string;
	username: string;
	fullName: string;
	roles: string[];
}




const getUrl = (param: string): string => {
	return `${process.env.REACT_APP_Backend_Url}/auth/${param}`;
};

export default class AuthApi {
	static async signIn(payload: signin): Promise<tokenResponse> {
		const response = await axios.post<tokenResponse>(getUrl('login'), payload);
		localStorage.setItem('user', JSON.stringify(response.data));
		return response.data;
	}

	static async signInWithMultiFactor(payload: signin): Promise<String> {
		const response = await axios.post<String>(
			getUrl('login-multiFactor'),
			payload
		);
		return response.data;
	}

	static async checkMultiFactorCode(
		payload: SignInWithCode
	): Promise<tokenResponse> {
		const response = await axios.post<tokenResponse>(
			getUrl('check-multiFactor'),
			payload
		);
		localStorage.setItem('user', JSON.stringify(response.data));
		return response.data;
	}

	static async signUp(payload: signup): Promise<string> {
		const response = await axios.post<string>(getUrl('register'), payload);
		return response.data;
	}

	static async deleteme(payload: deleteAccount): Promise<boolean> {
		const response = await axios.post<boolean>(getUrl('deleteMe'), payload, {
			headers: { Authorization: AuthHeader() },
		});
		return response.data;
	}

	static logout(): void {
		localStorage.removeItem('user');
	}

	static getUser(): boolean {
		const user = localStorage.getItem('user');
		if (user) {
			return true;
		}
		return false;
	}

	static getUserResponse(): User | null {
		const userStorage = localStorage.getItem('user');
		if (userStorage) {
			const user = JSON.parse(userStorage);
			return user;
		}
		return null;
	}

	static getUsername(): string {
		const userStorage = localStorage.getItem('user');
		if (userStorage) {
			const user = JSON.parse(userStorage);
			return user.username;
		}
		return '';
	}
}
