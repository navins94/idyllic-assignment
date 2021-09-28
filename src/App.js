import React from 'react';
import Navbar from './components/header/Header';
import AuthorizedRoutes from './AuthorizedRoutes';

function App() {
	return (
		<div className="App">
			<Navbar>
				<AuthorizedRoutes />
			</Navbar>
		</div>
	);
}

export default App;
