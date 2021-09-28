import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/features/AuthSlice';
import { login, loginFailure } from '../../redux/features/AuthSlice';
import CircularProgress from '@mui/material/CircularProgress';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
	const [inputs, setInputs] = useState({
		email: 'Shanna@melissa.tv',
		password: 'Antonette',
	});
	const [submitted, setSubmitted] = useState(false);
	const { email, password } = inputs;

	const { loggedIn, hasError } = useSelector(authSelector);

	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs((inputs) => ({ ...inputs, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSubmitted(true);
		if (email && password) {
			var pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
			);
			if (!pattern.test(email)) {
				dispatch(loginFailure('Please enter your valid email address.'));
			} else {
				await dispatch(
					login({
						email: email,
						password: password,
					}),
				);
			}
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						error={submitted && !email}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={handleChange}
					/>
					<TextField
						error={submitted && !password}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={handleChange}
					/>
					{hasError && <Alert severity="error">{hasError}!</Alert>}
					<Box sx={{ m: 1, position: 'relative' }}>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						{loggedIn && (
							<CircularProgress
								size={24}
								sx={{
									color: 'rgb(76, 175, 80)',
									position: 'absolute',
									top: '50%',
									left: '50%',
									marginTop: '-8px',
									marginLeft: '-12px',
								}}
							/>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
}
