import React from 'react';
import App from './App';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import { authSelector } from './redux/features/AuthSlice';

const AppWithAuth = () => {
	const { loggedIn } = useSelector(authSelector);
	return loggedIn ? <App /> : <Login />;
};
export default AppWithAuth;
