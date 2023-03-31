import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
	USER_LOGIN_SUCCESS,
	USER_LOGIN_REQUEST,
	USER_LOGOUT,
	USER_LOGIN_FAIL,
} from '../constants/userConstants';
import { RootState } from '../store/store';

export const login =
	(
		username: string,
		password: string
	): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
	async (
		dispatch: ThunkDispatch<RootState, unknown, AnyAction>
	): Promise<void> => {
		try {
			dispatch({
				type: USER_LOGIN_REQUEST,
			});

			const response = await fetch('http://localhost:8080/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					username,
					password,
				}),
			});

			const data = await response.json();
			const userData = { fullName: data.fullName};

			dispatch({
				type: USER_LOGIN_SUCCESS,
				payload: userData,
			});

			localStorage.setItem('userInfo', JSON.stringify(userData));
		} catch (error) {
			dispatch({
				type: USER_LOGIN_FAIL,
				payload: 'Error',
			});
		}
	};

export const logout =
	(): ThunkAction<void, RootState, unknown, AnyAction> =>
	async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
		localStorage.removeItem('userInfo');
		dispatch({ type: USER_LOGOUT });

		// await fetch('http://localhost:8081/api/logout', {
		// 	headers: { 'Content-Type': 'application/json' },
		// 	credentials: 'include',
		// });
	};
