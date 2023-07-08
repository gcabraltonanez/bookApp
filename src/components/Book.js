import React from 'react';
import {Button} from 'primereact/button';

const Book = ({title, author, price, releaseDate, id, deleteBook, editBook}) => {
	return (
		<tbody>
			<tr>
				<td>{title}</td>
				<td>{author}</td>
				<td>${price?.toFixed(2)}</td>
				<td>{releaseDate}</td>
				&nbsp; &nbsp;
				<Button
					style={{height: '40px'}}
					onClick={() => editBook(id)}
					severity='info'
					type='button'
					raised
					outlined
					icon='pi pi-fw pi-pencil'
					tooltip='Editar Libro'
					tooltipOptions={{showDelay: 200, position: 'top'}}></Button>
				&nbsp; &nbsp;
				<Button
					style={{height: '40px'}}
					onClick={() => deleteBook(id)}
					severity='danger'
					type='button'
					raised
					outlined
					icon='pi pi-fw pi-trash'
					tooltip='Eliminar Libro'
					tooltipOptions={{showDelay: 200, position: 'top'}}></Button>
			</tr>
		</tbody>
	);
};

export default Book;
