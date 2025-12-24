import Book from './Book';
import {LoadingSpinner, EmptyState} from './common';
import {formatDateForDisplay} from '../utils';
import {MESSAGES} from '../constants';
import styles from '../Books.module.css';

/**
 * Componente de tabla para mostrar la lista de libros
 */
const BookTable = ({books, isLoading, onDeleteBook, onEditBook}) => {
	if (isLoading) {
		return <LoadingSpinner />;
	}

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th>{MESSAGES.TABLE.TITLE}</th>
					<th>{MESSAGES.TABLE.AUTHOR}</th>
					<th>{MESSAGES.TABLE.PRICE}</th>
					<th>{MESSAGES.TABLE.RELEASE_DATE}</th>
					<th>{MESSAGES.TABLE.ACTIONS}</th>
				</tr>
			</thead>
			<tbody>
				{books.length > 0 ? (
					books.map((book) => (
						<Book
							key={book.id}
							title={book.title}
							author={book.author}
							price={book.price}
							releaseDate={formatDateForDisplay(book.releaseDate)}
							id={book.id}
							deleteBook={onDeleteBook}
							editBook={onEditBook}
						/>
					))
				) : (
					<tr>
						<td colSpan='5'>
							<EmptyState message={MESSAGES.LABELS.NO_BOOKS} />
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

export default BookTable;
