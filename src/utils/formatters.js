import dayjs from 'dayjs';
import {DATE_FORMATS} from '../constants';

/**
 * Capitaliza la primera letra de un string
 * @param {string} string - El string a capitalizar
 * @returns {string} - El string capitalizado
 */
export const capitalize = (string) => {
	if (!string) return null;
	const trimmed = string.toLowerCase().trim();
	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};

/**
 * Formatea una fecha para enviar a la API
 * @param {Date|string} date - La fecha a formatear
 * @returns {string} - Fecha en formato DD-MM-YYYY
 */
export const formatDateForAPI = (date) => {
	return dayjs(date).format(DATE_FORMATS.API);
};

/**
 * Formatea una fecha para mostrar al usuario
 * @param {Date|string} date - La fecha a formatear
 * @returns {string} - Fecha en formato DD/MM/YYYY
 */
export const formatDateForDisplay = (date) => {
	// Si la fecha viene en formato DD-MM-YYYY desde la API, parseamos con ese formato
	if (typeof date === 'string' && date.includes('-')) {
		return dayjs(date, DATE_FORMATS.API).format(DATE_FORMATS.DISPLAY);
	}
	return dayjs(date).format(DATE_FORMATS.DISPLAY);
};

/**
 * Formatea un precio para mostrar
 * @param {number} price - El precio a formatear
 * @returns {string} - Precio formateado con $ y 2 decimales
 */
export const formatPrice = (price) => {
	return `$${price?.toFixed(2)}`;
};
