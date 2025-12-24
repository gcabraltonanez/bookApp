import Input from './Input';
import BookDatePicker from './BookDatePicker';
import {ErrorMessage} from './common';
import {MESSAGES} from '../constants';
import styles from './Form.module.css';

const Form = ({book, setBook, editing, errors}) => {
	return (
		<div>
			<form id='book-form' style={{marginTop: '25px'}}>
				<span className={errors.title ? styles.inputWrapperError : ''}>
					<Input
						book={book}
						setBook={setBook}
						field='title'
						label={MESSAGES.FORM.TITLE_LABEL}
						tooltip={MESSAGES.FORM.TITLE_TOOLTIP}
						type='text'
					/>
				</span>
				<ErrorMessage message={errors.title} />

				<br />
				<span className={errors.author ? styles.inputWrapperError : ''}>
					<Input
						book={book}
						setBook={setBook}
						field='author'
						label={MESSAGES.FORM.AUTHOR_LABEL}
						tooltip={MESSAGES.FORM.AUTHOR_TOOLTIP}
						type='text'
					/>
				</span>
				<ErrorMessage message={errors.author} />

				<br />
				<span className={errors.price ? styles.inputWrapperError : ''}>
					<Input
						book={book}
						setBook={setBook}
						field='price'
						label={MESSAGES.FORM.PRICE_LABEL}
						tooltip={MESSAGES.FORM.PRICE_TOOLTIP}
						type='number'
					/>
				</span>
				<ErrorMessage message={errors.price} />

				<br />
				<span className={errors.releaseDate ? styles.inputWrapperError : ''}>
					<BookDatePicker book={book} setBook={setBook} editing={editing} />
				</span>
				<ErrorMessage message={errors.releaseDate} />
			</form>
		</div>
	);
};

export default Form;
