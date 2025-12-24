import {useCallback} from 'react';
import Swal from 'sweetalert2';
import {MESSAGES, CONFIRM_BUTTON_COLOR, CANCEL_BUTTON_COLOR} from '../constants';

/**
 * Custom hook para manejar diálogos de confirmación
 */
const useConfirmDialog = () => {
	/**
	 * Muestra un diálogo de confirmación
	 * @param {Function} onConfirm - Función a ejecutar si el usuario confirma
	 * @param {string} question - Pregunta a mostrar
	 * @param {Function} onSuccess - Callback opcional después de confirmar
	 */
	const showConfirmDialog = useCallback((onConfirm, question, onSuccess) => {
		Swal.fire({
			title: question,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: MESSAGES.LABELS.DELETE,
			cancelButtonText: MESSAGES.LABELS.CANCEL,
			confirmButtonColor: CONFIRM_BUTTON_COLOR,
			cancelButtonColor: CANCEL_BUTTON_COLOR,
			toast: true,
		}).then((result) => {
			if (result.isConfirmed) {
				onConfirm();
				if (onSuccess) {
					onSuccess();
				}
			}
		});
	}, []);

	return {showConfirmDialog};
};

export default useConfirmDialog;
