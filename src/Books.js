import {useState, useEffect} from 'react';
import axios from 'axios';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import dayjs from 'dayjs';

import Swal from 'sweetalert2';
import Book from './components/Book';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Form from './components/Form';

const baseUrl = `http://localhost:8080`;

const Books = () => {
	const [books, setBooks] = useState([]);

	const [editing, setEditing] = useState(false);

	const [isEmpty, setIsEmpty] = useState(true);

	const [book, setBook] = useState({
		visible: false,
		dataBook: {
			title: null,
			author: null,
			price: null,
			releaseDate: null,
		},
	});

	const [errors, setErrors] = useState({
		title: '',
		author: '',
		price: '',
	});

	useEffect(() => {
		getAllBooks();
		books.length === 0 ? setIsEmpty(true) : setIsEmpty(false);
	}, [books?.length]);

	useEffect(() => {
		getAllBooks();
	}, [book]);

	const items = [
		{
			label: 'Nuevo',
			icon: 'pi pi-fw pi-plus',
			command: () => {
				showCreateModal();
			},
		},
		{
			label: 'Eliminar todos',
			icon: 'pi pi-fw pi-trash',
			command: () => {
				deleteAllBooks();
			},
			disabled: isEmpty,
		},
	];

	const getAllBooks = async () => {
		return await axios
			.get(`${baseUrl}/books/all`)
			.then((res) => {
				setBooks(res.data);
				return res.data;
			})
			.catch((error) => {
				setIsEmpty(true);
			});
	};

	const showCreateModal = () => {
		setEditing(false);
		setErrors({
			title: '',
			author: '',
			price: '',
		});
		setBook({
			visible: true,
			dataBook: {
				title: null,
				author: null,
				price: null,
				releaseDate: null,
			},
		});
	};

	const showEditModal = (id) => {
		setEditing(true);
		axios
			.get(`${baseUrl}/books/findOne/${id}`)
			.then((res) => {
				setBook({
					visible: true,
					dataBook: {
						id: res.data.id,
						title: res.data.title,
						author: res.data.author,
						price: res.data.price,
						releaseDate: res.data.releaseDate,
					},
				});
			})
			.catch((error) => {});
	};

	const refresh = async () => {
		const newData = await fetch(`${baseUrl}/books/all`);
		setBooks(newData);
	};

	const resetForm = () => {
		setBook({
			visible: false,
			dataBook: {
				title: null,
				author: null,
				price: null,
				releaseDate: null,
			},
		});
	};

	const successToast = (message) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 2500,
		});

		Toast.fire({
			icon: 'success',
			title: message,
		});
	};

	const confirmDelete = (funct, question, message) => {
		const Toast = Swal.mixin({
			toast: true,
		});

		Toast.fire({
			title: question,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
			confirmButtonColor: '#239B56',
			cancelButtonColor: '#e4605e',
		}).then((result) => {
			if (result.isConfirmed) {
				funct();
				successToast(message);
				refresh();
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			}
		});
	};

	const capitalize = (string) => {
		if (!string) return null;
		string = string.toLowerCase().trim();
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const createBook = async (reqBook) => {
		await axios
			.post(`${baseUrl}/books/create`, {
				...reqBook,
				title: capitalize(reqBook.title),
				author: capitalize(reqBook.author),
			})
			.then((res) => {
				resetForm();
				refresh();
				successToast('Libro creado con exito');
				return res.data;
			})
			.catch((error) => {
				error.response.data.message
					? error.request.status === 400
						? setErrors({title: error.response.data.message})
						: setErrors({author: error.response.data.message})
					: setErrors(error.response.data);
			});
	};

	const deleteBook = (id) => {
		confirmDelete(
			() => {
				axios
					.delete(`${baseUrl}/books/delete/${id}`)
					.then((res) => {
						refresh();
					})
					.catch((error) => {});
			},
			'Desea eliminar este registro?',
			'Registro eliminado'
		);
	};

	const deleteAllBooks = () => {
		confirmDelete(
			() => {
				axios
					.delete(`${baseUrl}/books/deleteAll`)
					.then((res) => {
						refresh();
						// return res.data;
					})
					.catch((error) => {});
			},
			'Desea eliminar todos los registros?',
			'Se eliminaron todos los registros'
		);
	};

	const editBook = async (reqBook) => {
		await axios
			.put(`${baseUrl}/books/update`, reqBook)
			.then((res) => {
				resetForm();
				refresh();
				successToast('Libro modificado con exito');
			})
			.catch((error) => {
				error.response.data.message ? setErrors({title: error.response.data.message}) : setErrors(error.response.data);
			});
	};

	const createFooter = (reqBook) => {
		return (
			<div>
				<Button label='Crear' icon='pi pi-plus' onClick={() => createBook(reqBook)} />
			</div>
		);
	};

	const editFooter = (reqBook) => {
		return (
			<div>
				<Button label='Guardar' icon='pi pi-pencil' onClick={() => editBook(reqBook)} />
			</div>
		);
	};

	return (
		<div className='book-app'>
			<Panel header='Libro APP'>
				<Menubar model={items} />
			</Panel>
			<Dialog
				draggable={false}
				header={editing ? 'Editar libro' : 'Crear libro'}
				visible={book.visible}
				footer={editing ? editFooter(book.dataBook) : createFooter(book.dataBook)}
				style={{width: '400px'}}
				modal={true}
				onHide={() => {
					setBook({visible: false, dataBook: {...book.dataBook}});
				}}>
				<Form book={book} setBook={setBook} editing={editing} errors={errors} />
			</Dialog>
			<table class='table' style={{marginLeft: '10px'}}>
				<thead>
					<tr>
						<th>Titulo</th>
						<th>Autor</th>
						<th>Precio</th>
						<th>Fecha de lanzamiento</th>
					</tr>
				</thead>
				{books.length > 0 ? (
					books?.map((book) => (
						<Book
							title={book.title}
							author={book.author}
							price={book.price}
							releaseDate={dayjs(book?.releaseDate).format('DD/MM/YYYY')}
							id={book.id}
							deleteBook={deleteBook}
							editBook={showEditModal}></Book>
					))
				) : (
					<div style={{padding: '8px'}}>No hay libros cargados</div>
				)}
			</table>
		</div>
	);
};
export default Books;
