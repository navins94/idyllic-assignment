import React, { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';
import {
	movieSelector,
	fetchAllMovies,
} from '../../redux/features/MoviesSlice';

export default function Movies() {
	const dispatch = useDispatch();
	const history = useHistory();
	const { loading, hasError } = useSelector(movieSelector);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState(false);
	const [recentSearch, setRecentSearch] = useState(
		localStorage.getItem('savedQueries')
			? JSON.parse(localStorage.getItem('savedQueries'))
			: [],
	);

	useEffect(() => {
		fetchMovies();
	}, []);

	const fetchMovies = async (value) => {
		const s = value ? value : 'man';
		let response = await dispatch(fetchAllMovies(s));
		if (response.payload) {
			let newResponse = response.payload.map((v, index) => ({
				...v,
				Title: index + '-' + v.Title,
			}));
			setData(newResponse);
		}
	};

	const onChangeHandle = async (value) => {
		fetchMovies(value);
	};

	const debouncedChangeHandler = useMemo(
		() => debounce(onChangeHandle, 300),
		[],
	);

	const onSetStorage = (query) => {
		let queryArr = [];
		queryArr = recentSearch || [];
		const usernameCheck = (arr, usr) =>
			arr.map((u) => u.Title).includes(usr) || arr.push(query);
		usernameCheck(queryArr, query.Title);
		localStorage.setItem('savedQueries', JSON.stringify(queryArr));
	};

	useEffect(() => {
		return () => {
			debouncedChangeHandler.cancel();
		};
	}, []);

	const retrievedMovies =
		loading && !hasError ? (
			<Box sx={{ textAlign: 'center' }}>
				<CircularProgress />
			</Box>
		) : hasError ? (
			<Box sx={{ textAlign: 'center' }}>{hasError}</Box>
		) : (
			<Grid container spacing={4}>
				{data &&
					data.map((card) => (
						<Grid item key={card.imdbID + Math.random()} xs={12} sm={6} md={4}>
							<Card
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<CardMedia component="img" image={card.Poster} alt="random" />
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										{card.Title}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										component={Link}
										to={`/detail/${card.imdbID}`}
										size="small"
									>
										View
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
			</Grid>
		);

	return (
		<>
			<main>
				<Box
					sx={{
						bgcolor: 'background.paper',
						pt: 8,
						pb: 6,
					}}
				>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="text.primary"
							gutterBottom
						>
							Welcome
						</Typography>
						<Autocomplete
							disablePortal
							id="search"
							options={recentSearch.length > 0 && !search ? recentSearch : data}
							getOptionLabel={(option) => option.Title}
							onChange={(event, value) => {
								if (value !== null) {
									onSetStorage(value);
									history.push(`/detail/${value.imdbID}`);
									setSearch(false);
								} else {
									setSearch(false);
								}
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Search Movies"
									onChange={(ev) => {
										if (ev.target.value !== '' || ev.target.value !== null) {
											debouncedChangeHandler(ev.target.value);
											setSearch(true);
										} else {
											setSearch(false);
										}
									}}
								/>
							)}
						/>
					</Container>
				</Box>
				<Container sx={{ py: 8 }} maxWidth="md">
					{retrievedMovies}
				</Container>
			</main>
		</>
	);
}
