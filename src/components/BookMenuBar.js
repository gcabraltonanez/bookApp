import {useMemo} from 'react';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {MESSAGES} from '../constants';

/**
 * Componente de barra de menú para operaciones de libros
 */
const BookMenuBar = ({onCreateBook, onDeleteAll, isEmpty}) => {
	const menuItems = useMemo(
		() => [
			{
				label: MESSAGES.LABELS.NEW,
				icon: 'pi pi-fw pi-plus',
				command: onCreateBook,
			},
			{
				label: MESSAGES.LABELS.DELETE_ALL,
				icon: 'pi pi-fw pi-trash',
				command: onDeleteAll,
				disabled: isEmpty,
			},
		],
		[onCreateBook, onDeleteAll, isEmpty]
	);

	return (
		<Panel header='Libro APP'>
			<Menubar model={menuItems} />
		</Panel>
	);
};

export default BookMenuBar;
