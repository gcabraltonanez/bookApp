import React from 'react';
import {InputText} from 'primereact/inputtext';

const Form = ({book, setBook}) => {
	return (
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
						console.log(value);
						console.log(e.target);
						console.log(book);
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
	);
};

export default Form;
