import React from 'react';
import Boton from './Boton';

const Libro = ({title, author, price, releaseDate, id, eliminar, editar}) => {
	return (
		<tbody>
			<tr>
				<td>{title}</td>
				<td>{author}</td>
				<td>${price}</td>
				<td>{releaseDate}</td>
				<Boton funcion={editar} clase='btn btn-primary btn-sm' label={'Editar'} id={id}></Boton>
				<Boton funcion={eliminar} clase='btn btn-danger btn-sm' label={'Eliminar'} id={id}></Boton>
			</tr>
		</tbody>
	);
};

export default Libro;
