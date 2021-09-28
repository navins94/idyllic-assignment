import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './features/AuthSlice';
import movieReducer from './features/MoviesSlice';
const reducer = combineReducers({
	auth: authReducer,
	movies: movieReducer,
});
const store = configureStore({
	reducer,
});
export default store;
