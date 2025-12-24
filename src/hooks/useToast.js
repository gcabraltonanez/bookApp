import {useCallback} from 'react';
import Swal from 'sweetalert2';
import {TOAST_CONFIG} from '../constants';

/**
 * Custom hook para manejar notificaciones toast
 */
const useToast = () => {
	/**
	 * Muestra un toast de éxito
	 * @param {string} message - Mensaje a mostrar
	 */
	const showSuccess = useCallback((message) => {
		Swal.fire({
			...TOAST_CONFIG,
			icon: 'success',
			title: message,
		});
	}, []);

	/**
	 * Muestra un toast de error
	 * @param {string} message - Mensaje a mostrar
	 */
	const showError = useCallback((message) => {
		Swal.fire({
			...TOAST_CONFIG,
			icon: 'error',
			title: message,
		});
	}, []);

	/**
	 * Muestra un toast de información
	 * @param {string} message - Mensaje a mostrar
	 */
	const showInfo = useCallback((message) => {
		Swal.fire({
			...TOAST_CONFIG,
			icon: 'info',
			title: message,
		});
	}, []);

	return {
		showSuccess,
		showError,
		showInfo,
	};
};

export default useToast;
