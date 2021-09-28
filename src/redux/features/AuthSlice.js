import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { service } from '../../services';

export const initialState = {
	loggedIn: JSON.parse(localStorage.getItem('user')) ? true : false,
	user: JSON.parse(localStorage.getItem('user'))
		? JSON.parse(localStorage.getItem('user'))
		: {},
	loading: false,
	hasError: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginRequest: (state, action) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.hasError = '';
		},
		loginFailure: (state, action) => {
			state.hasError = action.payload;
			state.loading = false;
		},
		logOut: (state) => {
			state.user = {};
			state.loggedIn = false;
			localStorage.removeItem('user');
			localStorage.removeItem('savedQueries');
		},
	},
});

export const login = createAsyncThunk(
	'auth/login',
	async (obj, { dispatch }) => {
		service.login(obj.email, obj.password).then(
			(user) => {
				const result = user.filter((currentUser) => {
					return (
						currentUser.email.toLowerCase().includes(obj.email.toLowerCase()) &&
						currentUser.username
							.toLowerCase()
							.includes(obj.password.toLowerCase())
					);
				});
				if (result.length > 0) {
					localStorage.setItem('user', JSON.stringify(user));
					dispatch(loginSuccess(result));
					window.location.pathname = '/';
				} else {
					dispatch(loginFailure('User not exist'));
				}
			},
			(error) => {
				dispatch(loginFailure(error.toString()));
			},
		);
	},
);

export const { loginSuccess, loginFailure, logOut } = authSlice.actions;

export const authSelector = (state) => state.auth;

export default authSlice.reducer;
