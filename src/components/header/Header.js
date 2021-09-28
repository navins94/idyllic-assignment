import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { logOut } from '../../redux/features/AuthSlice';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Header({ children }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleLogout = () => {
		dispatch(logOut());
		history.push('/');
	};

	return (
		<div>
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
			>
				<Toolbar sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
					<Typography variant="h6" color="inherit" noWrap>
						Netflix
					</Typography>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
					>
						<nav>
							<Link
								variant="button"
								color="text.primary"
								to="/"
								sx={{ my: 1, mx: 1.5 }}
							>
								Home
							</Link>
						</nav>
						<Button
							onClick={handleLogout}
							variant="outlined"
							sx={{ my: 1, mx: 1.5 }}
						>
							Logout
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			{children}
		</div>
	);
}

export default Header;
