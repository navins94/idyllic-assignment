import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Container, Typography, Divider, Paper, Box } from '@mui/material/';
import { useDispatch } from 'react-redux';
import { fetchMovieDetail } from '../../redux/features/MoviesSlice';
import LinearProgress from '@mui/material/LinearProgress';

function MovieDetail({ match }) {
	const dispatch = useDispatch();
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const id = match.params.id;
		fetchMovieDetailAsync(id);
	}, []);

	const fetchMovieDetailAsync = async (id) => {
		setLoading(true);
		let res = await dispatch(fetchMovieDetail(id));
		setLoading(false);
		setData(res.payload);
	};

	return (
		<Container maxWidth="lg">
			{!loading ? (
				<main>
					<Grid container spacing={2} sx={{ mt: 3 }}>
						<Grid item xs={12}>
							<Box>
								<Paper
									sx={{
										position: 'relative',
										backgroundSize: 'cover',
										backgroundRepeat: 'no-repeat',
										backgroundPosition: 'center',
										minHeight: 320,
										backgroundImage: `url(${data.Poster})`,
									}}
								></Paper>
							</Box>
							<Box>
								<Typography variant="h5" gutterBottom sx={{ marginTop: 2 }}>
									{`${data.Title} `}
								</Typography>
								<Typography variant="h6" gutterBottom>
									{`${data.Year} - ${data.Runtime}`}
								</Typography>
							</Box>
							<Divider />
							<Box sx={{ display: 'flex', marginTop: 2 }}>
								{data.hasOwnProperty('Genre') &&
									data.Genre.split(',').map((item, index) => (
										<Typography
											key={item + index}
											sx={{
												marginRight: 2,
												border: '1px solid',
												padding: '5px 10px',
												borderRadius: 22,
											}}
										>
											{item}
										</Typography>
									))}
							</Box>
							<Box>
								<Typography variant="body1" sx={{ mt: 3 }}>
									{data.Plot}
								</Typography>
							</Box>
							<Box>
								<Typography variant="body1" sx={{ mt: 2 }}>
									<b style={{ color: 'blue' }}>Director - </b>
									{data.Director}
								</Typography>
								<Typography variant="body1" sx={{ mt: 1 }}>
									<b style={{ color: 'blue' }}>Writers - </b>
									{data.hasOwnProperty('Writer') &&
										data.Writer.split(',').join(' -')}
								</Typography>
								<Typography variant="body1" sx={{ mt: 1 }}>
									<b style={{ color: 'blue' }}>Actors - </b>
									{data.hasOwnProperty('Actors') &&
										data.Actors.split(',').join(' -')}
								</Typography>
								<Typography variant="body1" sx={{ mt: 1 }}>
									<b style={{ color: 'blue' }}>Language - </b>
									{data.hasOwnProperty('Language') &&
										data.Language.split(',').join(' -')}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</main>
			) : (
				<Box>
					<LinearProgress />
				</Box>
			)}
		</Container>
	);
}

export default MovieDetail;
