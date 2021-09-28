import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppWithAuth from './AppWithAuth';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<Provider store={store}>
			<BrowserRouter>
				<CssBaseline />
				<AppWithAuth />
			</BrowserRouter>
		</Provider>
	</ThemeProvider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
