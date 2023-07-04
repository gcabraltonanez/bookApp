import {useState, useEffect} from 'react';
import axios from 'axios';

const App = () => {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:8080/books/all`)
			.then((res) => {
				setBooks(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const eliminarLibros = () => {
		axios
			.delete(`http://localhost:8080/books/deleteAll`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className='header' style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
			<div style={{display: 'flex', justifyContent: 'center'}}>
				<h1>LibrosAPP</h1>
				<button onClick={eliminarLibros}>Eliminar todos los libros</button>
			</div>

			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					gap: '25px',
					flexWrap: 'wrap',
				}}>
				{books.length > 0
					? books.map((book) => (
							<div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
								<h4>
									Título: {book.title}
									<br />
									Autor: {book.author}
									<br />
									Precio: ${book.price}
									<br />
									Fecha de lanzamiento: {book.releaseDate}
									<br />
								</h4>
								<div style={{display: 'flex', justifyContent: 'space-around'}}>
									<button onClick={() => console.log('Boton Editar')}>Editar</button>
									<button onClick={() => console.log('Boton Eliminar')}>Eliminar</button>
								</div>
							</div>
					  ))
					: 'No hay libros cargados en la base'}
			</div>
		</div>
	);
};
export default App;
