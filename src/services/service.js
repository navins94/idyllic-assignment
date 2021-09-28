export const service = {
	login,
	logout,
	getAllMovies,
	getMovie,
};

function login(email, password) {
	return fetch(`https://jsonplaceholder.typicode.com/users`)
		.then(handleResponse)
		.then((user) => {
			return user;
		});
}

function logout() {
	localStorage.removeItem('user');
}

function getAllMovies(s) {
	return fetch(`http://www.omdbapi.com/?apikey=241712fa&s=${s}`).then(
		handleResponse,
	);
}

function getMovie(i) {
	return fetch(`http://www.omdbapi.com/?apikey=241712fa&i=${i}`).then(
		handleResponse,
	);
}

function handleResponse(response) {
	return response.text().then((text) => {
		const data = text && JSON.parse(text);
		if (!response.ok) {
			if (response.status === 401) {
				logout();
			}
			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}
