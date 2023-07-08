import {InputText} from 'primereact/inputtext';
import React from 'react';

const Input = ({book, setBook, field, label, tooltip, type}) => {
	return (
		<span className='p-float-label'>
			<InputText
				className='p-inputtext-sm'
				value={book?.dataBook?.[field]}
				style={{width: '100%'}}
				id='campo'
				type={type}
				tooltipOptions={{event: 'focus'}}
				tooltip={tooltip}
				onChange={(e) => {
					let {value} = e.target;
					setBook({
						visible: true,
						dataBook: {
							...book.dataBook,
							[field]: value,
						},
					});
				}}
			/>
			<label htmlFor='title'>{label}</label>
		</span>
	);
};

export default Input;
