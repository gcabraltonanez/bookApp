import {Button} from 'primereact/button';
import {formatPrice} from '../utils';
import {MESSAGES, BUTTON_HEIGHT} from '../constants';
import styles from './Book.module.css';

const Book = ({title, author, price, releaseDate, id, deleteBook, editBook}) => {
	return (
		<tr className={styles.bookRow}>
			<td>{title}</td>
			<td>{author}</td>
			<td>{formatPrice(price)}</td>
			<td>{releaseDate}</td>
			<td>
				<div className={styles.actionsCell}>
					<Button
						className={styles.actionButton}
						style={{height: BUTTON_HEIGHT}}
						onClick={() => editBook(id)}
						severity='info'
						type='button'
						raised
						outlined
						icon='pi pi-fw pi-pencil'
						tooltip={MESSAGES.TOOLTIPS.EDIT_BOOK}
						tooltipOptions={{showDelay: 200, position: 'top'}}
					/>
					<Button
						className={styles.actionButton}
						style={{height: BUTTON_HEIGHT}}
						onClick={() => deleteBook(id)}
						severity='danger'
						type='button'
						raised
						outlined
						icon='pi pi-fw pi-trash'
						tooltip={MESSAGES.TOOLTIPS.DELETE_BOOK}
						tooltipOptions={{showDelay: 200, position: 'top'}}
					/>
				</div>
			</td>
		</tr>
	);
};

export default Book;
