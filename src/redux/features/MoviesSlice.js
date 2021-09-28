import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { service } from '../../services';

export const initialState = {
	loading: false,
	hasError: '',
};

const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		movieRequest: (state, action) => {
			state.loading = true;
		},
		movieSuccess: (state) => {
			state.loading = false;
		},
		movieFailure: (state, action) => {
			state.hasError = action.payload;
			state.loading = false;
		},
	},
});

export const fetchAllMovies = createAsyncThunk(
	'movies/fetchAllMovies',
	async (s, { dispatch }) => {
		dispatch(movieRequest());
		try {
			const response = await service.getAllMovies(s);
			if (response.Response === 'True') {
				dispatch(movieSuccess());
				dispatch(movieFailure(''));
				return response.Search;
			} else {
				dispatch(movieFailure(response.Error));
			}
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchMovieDetail = createAsyncThunk(
	'movies/fetchMovieDetail',
	async (s, { dispatch }) => {
		dispatch(movieRequest());
		try {
			const response = await service.getMovie(s);
			return response;
		} catch (error) {
			console.log(error);
		}
	},
);

export const { movieRequest, movieSuccess, movieFailure } = movieSlice.actions;

export const movieSelector = (state) => state.movies;

export default movieSlice.reducer;
