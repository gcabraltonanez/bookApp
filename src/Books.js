import {useCallback} from 'react';

import BookMenuBar from './components/BookMenuBar';
import BookDialog from './components/BookDialog';
import BookTable from './components/BookTable';

import {useBooks, useBookForm, useConfirmDialog, useToast} from './hooks';
import {capitalize} from './utils';
import {MESSAGES} from './constants';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import styles from './Books.module.css';

const Books = () => {
	// Custom hooks
	const {books, isLoading, createBook, updateBook, deleteBook, deleteAllBooks, fetchBookById} = useBooks();
	const {isVisible, isEditing, bookData, errors, openCreateModal, openEditModal, closeModal, updateBookData, handleApiError} =
		useBookForm();
	const {showConfirmDialog} = useConfirmDialog();
	const {showSuccess} = useToast();

	/**
	 * Maneja la creación de un libro
	 */
	const handleCreateBook = useCallback(async () => {
		try {
			const bookToCreate = {
				...bookData,
				title: capitalize(bookData.title),
				author: capitalize(bookData.author),
			};

			await createBook(bookToCreate);
			closeModal();
			showSuccess(MESSAGES.SUCCESS.BOOK_CREATED);
		} catch (error) {
			handleApiError(error);
		}
	}, [bookData, createBook, closeModal, showSuccess, handleApiError]);

	/**
	 * Maneja la edición de un libro
	 */
	const handleEditBook = useCallback(async () => {
		try {
			await updateBook(bookData);
			closeModal();
			showSuccess(MESSAGES.SUCCESS.BOOK_UPDATED);
		} catch (error) {
			handleApiError(error);
		}
	}, [bookData, updateBook, closeModal, showSuccess, handleApiError]);

	/**
	 * Abre el modal de edición y carga los datos del libro
	 */
	const handleOpenEditModal = useCallback(
		async (id) => {
			try {
				const book = await fetchBookById(id);
				openEditModal(book);
			} catch (error) {
				console.error('Error al cargar el libro:', error);
			}
		},
		[fetchBookById, openEditModal]
	);

	/**
	 * Maneja la eliminación de un libro
	 */
	const handleDeleteBook = useCallback(
		(id) => {
			showConfirmDialog(
				async () => {
					try {
						await deleteBook(id);
						showSuccess(MESSAGES.SUCCESS.BOOK_DELETED);
					} catch (error) {
						console.error('Error al eliminar libro:', error);
					}
				},
				MESSAGES.CONFIRM.DELETE_BOOK
			);
		},
		[deleteBook, showConfirmDialog, showSuccess]
	);

	/**
	 * Maneja la eliminación de todos los libros
	 */
	const handleDeleteAllBooks = useCallback(() => {
		showConfirmDialog(
			async () => {
				try {
					await deleteAllBooks();
					showSuccess(MESSAGES.SUCCESS.ALL_BOOKS_DELETED);
				} catch (error) {
					console.error('Error al eliminar todos los libros:', error);
				}
			},
			MESSAGES.CONFIRM.DELETE_ALL_BOOKS
		);
	}, [deleteAllBooks, showConfirmDialog, showSuccess]);

	/**
	 * Maneja el guardado del libro (crear o editar)
	 */
	const handleSaveBook = useCallback(() => {
		if (isEditing) {
			handleEditBook();
		} else {
			handleCreateBook();
		}
	}, [isEditing, handleEditBook, handleCreateBook]);

	return (
		<div className={styles.bookApp}>
			<BookMenuBar onCreateBook={openCreateModal} onDeleteAll={handleDeleteAllBooks} isEmpty={books.length === 0} />

			<BookDialog
				isVisible={isVisible}
				isEditing={isEditing}
				bookData={bookData}
				errors={errors}
				onClose={closeModal}
				onSave={handleSaveBook}
				onUpdateBook={updateBookData}
			/>

			<BookTable books={books} isLoading={isLoading} onDeleteBook={handleDeleteBook} onEditBook={handleOpenEditModal} />
		</div>
	);
};

export default Books;
