import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Interceptor para request (por si necesitamos agregar tokens en el futuro)
api.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Interceptor para response (manejo centralizado de errores)
api.interceptors.response.use(
	(response) => response,
	(error) => {
		// Manejo centralizado de errores
		if (error.response) {
			// El servidor respondió con un código de error
			console.error('Error de respuesta:', error.response.data);
		} else if (error.request) {
			// La petición se hizo pero no hubo respuesta
			console.error('Error de red:', error.request);
		} else {
			// Algo pasó al configurar la petición
			console.error('Error:', error.message);
		}
		return Promise.reject(error);
	}
);

export default api;
