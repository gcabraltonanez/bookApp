import {useState, useEffect, useCallback} from 'react';
import bookService from '../services/bookService';

/**
 * Custom hook para gestionar la lista de libros y operaciones CRUD
 */
const useBooks = () => {
	const [books, setBooks] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/**
	 * Obtiene todos los libros
	 */
	const fetchBooks = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await bookService.getAllBooks();
			setBooks(data);
		} catch (err) {
			setError(err);
			setBooks([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	/**
	 * Obtiene un libro por ID
	 */
	const fetchBookById = useCallback(async (id) => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await bookService.getBookById(id);
			return data;
		} catch (err) {
			setError(err);
			throw err;
		} finally {
			setIsLoading(false);
		}
	}, []);

	/**
	 * Crea un nuevo libro
	 */
	const createBook = useCallback(
		async (bookData) => {
			setIsLoading(true);
			setError(null);
			try {
				const newBook = await bookService.createBook(bookData);
				await fetchBooks(); // Refrescar la lista
				return newBook;
			} catch (err) {
				setError(err);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[fetchBooks]
	);

	/**
	 * Actualiza un libro existente
	 */
	const updateBook = useCallback(
		async (bookData) => {
			setIsLoading(true);
			setError(null);
			try {
				const updatedBook = await bookService.updateBook(bookData);
				await fetchBooks(); // Refrescar la lista
				return updatedBook;
			} catch (err) {
				setError(err);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[fetchBooks]
	);

	/**
	 * Elimina un libro por ID
	 */
	const deleteBook = useCallback(
		async (id) => {
			setIsLoading(true);
			setError(null);
			try {
				await bookService.deleteBook(id);
				await fetchBooks(); // Refrescar la lista
			} catch (err) {
				setError(err);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[fetchBooks]
	);

	/**
	 * Elimina todos los libros
	 */
	const deleteAllBooks = useCallback(
		async () => {
			setIsLoading(true);
			setError(null);
			try {
				await bookService.deleteAllBooks();
				await fetchBooks(); // Refrescar la lista
			} catch (err) {
				setError(err);
				throw err;
			} finally {
				setIsLoading(false);
			}
		},
		[fetchBooks]
	);

	// Cargar libros al montar el componente
	useEffect(() => {
		fetchBooks();
	}, [fetchBooks]);

	return {
		books,
		isLoading,
		error,
		fetchBooks,
		fetchBookById,
		createBook,
		updateBook,
		deleteBook,
		deleteAllBooks,
	};
};

export default useBooks;
