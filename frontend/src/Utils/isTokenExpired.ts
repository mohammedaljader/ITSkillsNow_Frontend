import jwt_decode from 'jwt-decode';

export const isTokenExpired = (token: string): boolean => {
	try {
		const decodedToken: any = jwt_decode(token); // Decode the token

		if (decodedToken.exp) {
			const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

			return decodedToken.exp < currentTime;
		}
		return false;
	} catch (error) {
		console.error('Failed to decode token:', error);
		return false;
	}
};
