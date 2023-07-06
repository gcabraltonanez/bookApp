import {useState, useEffect} from 'react';
import axios from 'axios';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import Swal from 'sweetalert2';
import Libro from './components/Libro';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Form from './components/Form';

const urlBase = `http://localhost:8080`;

const Libros = () => {
	const [books, setBooks] = useState([]);

	const [editing, setEditing] = useState(false);

	const [book, setBook] = useState({
		visible: false,
		dataBook: {
			title: null,
			author: null,
			price: null,
			releaseDate: null,
		},
	});

	useEffect(() => {
		getAllBooks();
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
				eliminarTodosLibros();
			},
		},
	];

	const showCreateModal = () => {
		setEditing(false);
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
		console.log(id);
		axios
			.get(`${urlBase}/books/findOne/${id}`)
			.then((res) => {
				console.log(res);
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
				console.log(book);
			})
			.catch((error) => {
				console.log(error.response?.data?.message);
			});
	};

	const getAllBooks = async () => {
		return await axios
			.get(`${urlBase}/books/all`)
			.then((res) => {
				setBooks(res.data);
			})
			.catch((error) => {});
	};

	const refresh = async () => {
		const newData = await fetch(`${urlBase}/books/all`);
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

	const success = (mensaje) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 2500,
		});

		Toast.fire({
			icon: 'success',
			title: mensaje,
		});
	};

	const errorToast = (error, mensaje) => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'center',
			confirmButtonText: 'Ok',
			timer: 5000,
		});

		Toast.fire({
			icon: 'error',
			title: mensaje,
			text: error.response?.data?.message,
			confirmButtonColor: '#e4605e',
		});
	};

	const confirmarEliminacion = (funcion, question, mensaje) => {
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
				funcion();
				success(mensaje);
			} else if (result.dismiss === Swal.DismissReason.cancel) {
			}
		});
	};

	const crearLibro = async (libro) => {
		await axios
			.post(`${urlBase}/books/create`, libro)
			.then((res) => {
				resetForm();
				refresh();
				success('Libro creado con exito');
				console.log(res.data);
				return res.data;
			})
			.catch((error) => {
				errorToast(error, 'Error al crear el libro');
				resetForm();
			});
	};

	const eliminarUnLibro = (id) => {
		confirmarEliminacion(
			() => {
				axios
					.delete(`${urlBase}/books/delete/${id}`)
					.then((res) => {
						console.log(res.data);
					})
					.catch((error) => {});
				refresh();
			},
			'Desea eliminar este registro?',
			'Registro eliminado'
		);
	};

	const eliminarTodosLibros = () => {
		confirmarEliminacion(
			() => {
				axios
					.delete(`${urlBase}/books/deleteAll`)
					.then((res) => {
						console.log(res.data);
					})
					.catch((error) => {
						console.log(error.response?.data?.message);
					});
				refresh();
			},
			'Desea eliminar todos los registros?',
			'Se eliminaron todos los registros'
		);
	};

	const editarLibro = async (libro) => {
		console.log(libro);

		await axios
			.put(`${urlBase}/books/update`, libro)
			.then((res) => {
				console.log(res.data);
				resetForm();
				refresh();
				success('Libro modificado con exito');
			})
			.catch((error) => {
				errorToast(error, 'Error al crear el libro');
				resetForm();
			});
	};

	const createFooter = (libro) => {
		return (
			<div>
				<Button label='Guardar' icon='pi pi-check' onClick={() => crearLibro(libro)} />
			</div>
		);
	};

	const editFooter = (libro) => {
		return (
			<div>
				<Button label='Guardar' icon='pi pi-check' onClick={() => editarLibro(libro)} />
			</div>
		);
	};

	return (
		<div className='book-app'>
			<Panel header='Libro APP'>
				<Menubar model={items} />
			</Panel>
			<Dialog
				header={editing ? 'Editar libro' : 'Crear libro'}
				visible={book.visible}
				footer={editing ? editFooter(book.dataBook) : createFooter(book.dataBook)}
				style={{width: '400px'}}
				modal={true}
				onHide={() => {
					setBook({visible: false, dataBook: {...book.dataBook}});
				}}>
				<Form book={book} setBook={setBook}></Form>
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
						<Libro
							title={book.title}
							author={book.author}
							price={book.price}
							releaseDate={book.releaseDate}
							id={book.id}
							eliminar={eliminarUnLibro}
							editar={showEditModal}></Libro>
					))
				) : (
					<div style={{padding: '8px'}}>No hay libros cargados</div>
				)}
			</table>
		</div>
	);
};
export default Libros;
