import {useMemo} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import Form from './Form';
import {MESSAGES, DIALOG_WIDTH} from '../constants';
import styles from '../Books.module.css';

/**
 * Componente de diálogo para crear/editar libros
 */
const BookDialog = ({isVisible, isEditing, bookData, errors, onClose, onSave, onUpdateBook}) => {
	const footer = useMemo(
		() => (
			<div>
				<Button label={isEditing ? MESSAGES.LABELS.SAVE : MESSAGES.LABELS.CREATE} icon={isEditing ? 'pi pi-pencil' : 'pi pi-plus'} onClick={onSave} />
			</div>
		),
		[isEditing, onSave]
	);

	return (
		<Dialog
			draggable={false}
			header={isEditing ? MESSAGES.LABELS.EDIT_BOOK : MESSAGES.LABELS.CREATE_BOOK}
			visible={isVisible}
			footer={footer}
			className={styles.dialog}
			style={{width: DIALOG_WIDTH}}
			modal={true}
			onHide={onClose}>
			<Form
				book={{visible: isVisible, dataBook: bookData}}
				setBook={({dataBook}) => onUpdateBook(dataBook)}
				editing={isEditing}
				errors={errors}
			/>
		</Dialog>
	);
};

export default BookDialog;
