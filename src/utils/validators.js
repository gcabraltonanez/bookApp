/**
 * Valida si un string está vacío o es null
 * @param {string} value - El valor a validar
 * @returns {boolean} - true si está vacío
 */
export const isEmpty = (value) => {
	return !value || value.trim() === '';
};

/**
 * Valida un libro antes de enviarlo a la API
 * @param {Object} book - El libro a validar
 * @returns {Object} - Objeto con errores { field: errorMessage }
 */
export const validateBook = (book) => {
	const errors = {};

	if (isEmpty(book.title)) {
		errors.title = 'El título es requerido';
	}

	if (isEmpty(book.author)) {
		errors.author = 'El autor es requerido';
	}

	if (!book.price || book.price <= 0) {
		errors.price = 'El precio debe ser mayor a 0';
	}

	if (!book.releaseDate) {
		errors.releaseDate = 'La fecha de lanzamiento es requerida';
	}

	return errors;
};

/**
 * Determina el campo con error basado en el mensaje de error de la API
 * @param {string} errorMessage - El mensaje de error de la API
 * @returns {string} - El nombre del campo con error
 */
export const determineErrorField = (errorMessage) => {
	if (!errorMessage) return 'general';

	const lowerMessage = errorMessage.toLowerCase();

	if (lowerMessage.includes('releasedate') || lowerMessage.includes('localdate') || lowerMessage.includes('fecha')) {
		return 'releaseDate';
	}

	if (lowerMessage.includes('title') || lowerMessage.includes('titulo')) {
		return 'title';
	}

	if (lowerMessage.includes('author') || lowerMessage.includes('autor')) {
		return 'author';
	}

	if (lowerMessage.includes('price') || lowerMessage.includes('precio')) {
		return 'price';
	}

	return 'general';
};
