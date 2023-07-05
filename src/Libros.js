import {useState, useEffect} from 'react';
import axios from 'axios';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import Libro from './components/Libro';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import Swal from 'sweetalert2';

import 'primereact/resources/themes/saga-green/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const urlBase = `http://localhost:8080`;

const Libros = () => {
	const [books, setBooks] = useState([]);

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
		const res = await axios
			.post(`${urlBase}/books/create`, libro)
			.then((res) => {
				resetForm();
				refresh();
				success('Libro creado con exito');
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

	const editarLibro = (id) => {
		return 'hola';
	};

	const footer = (libro) => {
		return (
			<div>
				<Button label='Guardar' icon='pi pi-check' onClick={() => crearLibro(libro)} />
			</div>
		);
	};

	return (
		<div className='book-app'>
			<Panel header='Libro APP'>
				<Menubar model={items} />
			</Panel>
			<Dialog header='Crear libro' visible={book.visible} footer={footer(book.dataBook)} style={{width: '400px'}} modal={true} onHide={() => setBook({visible: false})}>
				<form id='libro-form'>
					<span className='p-float-label'>
						<InputText
							className='p-inputtext-sm'
							value={book?.dataBook?.title}
							style={{width: '100%'}}
							id='title'
							tooltipOptions={{event: 'focus'}}
							tooltip='Ingrese el título del libro'
							onChange={(e) => {
								let value = e.target.value;
								setBook({
									visible: true,
									dataBook: {
										...book.dataBook,
										title: value,
									},
								});
							}}
						/>
						<label htmlFor='title'>Titulo</label>
					</span>
					<br />
					<span className='p-float-label'>
						<InputText
							className='p-inputtext-sm'
							value={book?.dataBook?.author}
							style={{width: '100%'}}
							id='author'
							tooltipOptions={{event: 'focus'}}
							tooltip='Ingrese el autor del libro'
							onChange={(e) => {
								let val = e.target.value;
								console.log(book.dataBook);
								console.log(val);
								setBook({
									visible: true,
									dataBook: {
										...book.dataBook,
										author: val,
									},
								});
							}}
						/>
						<label htmlFor='author'>Autor</label>
					</span>
					<br />
					<span className='p-float-label'>
						<InputText
							inputMode='numeric'
							className='p-inputtext-sm'
							value={book?.dataBook?.price}
							style={{width: '100%'}}
							id='price'
							tooltipOptions={{event: 'focus'}}
							tooltip='Ingrese el precio del libro'
							onChange={(e) => {
								let val = e.target.value;
								console.log(book.dataBook);
								console.log(val);
								setBook({
									visible: true,
									dataBook: {
										...book.dataBook,
										price: val,
									},
								});
							}}
						/>
						<label htmlFor='price'>Precio</label>
					</span>
					<br />
					<span className='p-float-label'>
						<InputText
							className='p-inputtext-sm'
							value={book?.dataBook?.releaseDate}
							style={{width: '100%'}}
							id='releaseDate'
							tooltipOptions={{event: 'focus'}}
							tooltip='Ingrese la fecha de lanzamiento'
							onChange={(e) => {
								let val = e.target.value;
								console.log(book.dataBook);
								console.log(val);
								setBook({
									visible: true,
									dataBook: {
										...book.dataBook,
										releaseDate: val,
									},
								});
							}}
						/>
						<label htmlFor='releaseDate'>Fecha lanzamiento</label>
					</span>
				</form>
			</Dialog>
			<table class='table'>
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
							editar={editarLibro}></Libro>
					))
				) : (
					<span style={{padding: '8px'}}>No hay libros cargados</span>
				)}
			</table>
		</div>
	);
};
export default Libros;
