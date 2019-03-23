import axios from 'axios';

const catchError = () => {};

const parseData = response => {
	if (response.data ) {
		return response.data;
	}
	const error = new Error();
	error.response = response.data;
	return Promise.reject(error);
};

class Request {
	constructor() {
		this.prefix = '/api';
	}

	get({ url }) {
		return axios
			.get(url)
			.then(parseData)
			.catch(catchError);
	}

	post({ url, data, config }) {
		return axios
			.post( this.prefix + url, data, { ...config })
			.then(parseData)
			.catch(catchError);
	}
}

const request = new Request();

export default request;
