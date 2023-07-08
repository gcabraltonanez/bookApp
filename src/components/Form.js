import React from 'react';
import Input from './Input';

import 'react-datepicker/dist/react-datepicker.css';
import BookDatePicker from './BookDatePicker';

const Form = ({book, setBook, editing, errors}) => {
	let styles = {
		fontWeight: 'bold',
		color: '#dc3545',
		fontSize: '15px',
		margin: '2px 0 0 4px',
	};

	return (
		<div>
			<form id='book-form' style={{marginTop: '25px'}}>
				<span className={errors.title && 'input-container-error'}>
					<Input book={book} setBook={setBook} field={'title'} label={'Titulo'} tooltip={'Ingrese el título del libro'} type={'text'} />
				</span>
				{errors.title && <p style={styles}>{errors.title}</p>}

				<br />
				<span className={errors.author && 'input-container-error'}>
					<Input book={book} setBook={setBook} field={'author'} label={'Autor'} tooltip={'Ingrese el autor'} type={'text'} />
					{errors.author && <p style={styles}>{errors.author}</p>}
				</span>
				<br />
				<span className={errors.price && 'input-container-error'}>
					<Input book={book} setBook={setBook} field={'price'} label={'Precio'} tooltip={'Ingrese el precio'} type={'number'} />
					{errors.price && <p style={styles}>{errors.price}</p>}
				</span>
				<br />
				<BookDatePicker book={book} setBook={setBook} editing={editing} />
			</form>
		</div>
	);
};

export default Form;
