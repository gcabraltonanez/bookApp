import {useState, useCallback} from 'react';
import {determineErrorField} from '../utils';

const INITIAL_BOOK_DATA = {
	title: null,
	author: null,
	price: null,
	releaseDate: null,
};

const INITIAL_ERRORS = {
	title: '',
	author: '',
	price: '',
	releaseDate: '',
};

/**
 * Custom hook para gestionar el estado del formulario de libro
 */
const useBookForm = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [bookData, setBookData] = useState(INITIAL_BOOK_DATA);
	const [errors, setErrors] = useState(INITIAL_ERRORS);

	/**
	 * Abre el modal en modo creación
	 */
	const openCreateModal = useCallback(() => {
		setIsEditing(false);
		setBookData(INITIAL_BOOK_DATA);
		setErrors(INITIAL_ERRORS);
		setIsVisible(true);
	}, []);

	/**
	 * Abre el modal en modo edición
	 */
	const openEditModal = useCallback((book) => {
		setIsEditing(true);
		setBookData(book);
		setErrors(INITIAL_ERRORS);
		setIsVisible(true);
	}, []);

	/**
	 * Cierra el modal
	 */
	const closeModal = useCallback(() => {
		setIsVisible(false);
		setBookData(INITIAL_BOOK_DATA);
		setErrors(INITIAL_ERRORS);
	}, []);

	/**
	 * Actualiza un campo del libro
	 */
	const updateField = useCallback((field, value) => {
		setBookData((prev) => ({
			...prev,
			[field]: value,
		}));
	}, []);

	/**
	 * Actualiza todo el objeto de libro
	 */
	const updateBookData = useCallback((newData) => {
		setBookData(newData);
	}, []);

	/**
	 * Maneja errores de la API
	 */
	const handleApiError = useCallback((error) => {
		if (error.response && error.response.data) {
			if (error.response.data.message) {
				const errorMessage = error.response.data.message;
				const field = determineErrorField(errorMessage);
				setErrors({[field]: errorMessage});
			} else {
				// Múltiples errores de validación
				setErrors(error.response.data);
			}
		}
	}, []);

	/**
	 * Limpia los errores
	 */
	const clearErrors = useCallback(() => {
		setErrors(INITIAL_ERRORS);
	}, []);

	/**
	 * Establece un error específico
	 */
	const setError = useCallback((field, message) => {
		setErrors((prev) => ({
			...prev,
			[field]: message,
		}));
	}, []);

	return {
		isVisible,
		isEditing,
		bookData,
		errors,
		openCreateModal,
		openEditModal,
		closeModal,
		updateField,
		updateBookData,
		handleApiError,
		clearErrors,
		setError,
	};
};

export default useBookForm;
