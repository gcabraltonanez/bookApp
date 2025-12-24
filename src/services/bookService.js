import api from './api';

const bookService = {
	// Obtener todos los libros
	getAllBooks: async () => {
		const response = await api.get('/books/all');
		return response.data;
	},

	// Obtener un libro por ID
	getBookById: async (id) => {
		const response = await api.get(`/books/findOne/${id}`);
		return response.data;
	},

	// Crear un libro
	createBook: async (bookData) => {
		const response = await api.post('/books/create', bookData);
		return response.data;
	},

	// Actualizar un libro
	updateBook: async (bookData) => {
		const response = await api.put('/books/update', bookData);
		return response.data;
	},

	// Eliminar un libro
	deleteBook: async (id) => {
		const response = await api.delete(`/books/delete/${id}`);
		return response.data;
	},

	// Eliminar todos los libros
	deleteAllBooks: async () => {
		const response = await api.delete('/books/deleteAll');
		return response.data;
	},
};

export default bookService;
