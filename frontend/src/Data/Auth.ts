import axios from 'axios';

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

interface tokenResponse {
	accessToken: string;
}

const getUrl = (param: string): string => {
	return `http://localhost:8080/auth/${param}`;
};

export default class AuthApi {
	static async signIn(payload: signin): Promise<tokenResponse> {
		const response = await axios.post<tokenResponse>(getUrl('/login'), payload);
        localStorage.setItem('user', JSON.stringify(response.data));
		return response.data;
	}


    static async signUp(payload: signup): Promise<string> {
		const response = await axios.post<string>(getUrl('/register'), payload);
		return response.data;
	}


    static logout(): void {
        localStorage.removeItem('user');
    }

	static getUser(): boolean{
		const user = localStorage.getItem('user')
		if(user){
			return true;
		}
		return false;
	}
}

