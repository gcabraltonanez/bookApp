import React from 'react';
import {Button} from 'primereact/button';

const Libro = ({title, author, price, releaseDate, id, eliminar, editar}) => {
	return (
		<tbody>
			<tr>
				<td>{title}</td>
				<td>{author}</td>
				<td>${price}</td>
				<td>{releaseDate}</td>
				&nbsp; &nbsp;
				<Button
					onClick={() => editar(id)}
					severity='info'
					type='button'
					raised
					outlined
					icon='pi pi-fw pi-pencil'
					tooltip='Editar Libro'
					tooltipOptions={{showDelay: 200}}></Button>
				&nbsp; &nbsp;
				<Button
					onClick={() => eliminar(id)}
					severity='danger'
					type='button'
					raised
					outlined
					icon='pi pi-fw pi-trash'
					tooltip='Eliminar Libro'
					tooltipOptions={{showDelay: 200}}></Button>
			</tr>
		</tbody>
	);
};

export default Libro;
