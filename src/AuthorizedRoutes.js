import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from './components/global/ErrorBoundary';
import HomePage from './pages/movies/Movies';
import MovieDetail from './pages/movies/MovieDetail';

const Routes = () => {
	return (
		<ErrorBoundary>
			<React.Suspense fallback={<div />}>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/detail/:id" component={MovieDetail} />
				</Switch>
			</React.Suspense>
		</ErrorBoundary>
	);
};
export default Routes;
