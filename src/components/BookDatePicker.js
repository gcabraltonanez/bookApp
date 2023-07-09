import dayjs from 'dayjs';
import {DemoItem} from '@mui/x-date-pickers/internals/demo';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useEffect, useState} from 'react';

const BookDatePicker = ({book, setBook, editing}) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	useEffect(() => {
		!editing &&
			setBook({
				visible: true,
				dataBook: {
					...book.dataBook,
					releaseDate: dayjs(selectedDate).format('MM/DD/YYYY'),
				},
			});
	}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box mt={2}>
				<DemoItem>
					<DatePicker
						format="DD/MM/YYYY"
						label='Fecha Lanzamiento'
						slotProps={{
							textField: {
								helperText: 'día/mes/año',
							},
						}}
						defaultValue={dayjs(new Date())}
						value={editing ? dayjs(book?.dataBook?.releaseDate) : dayjs(selectedDate)}
						maxDate={dayjs(new Date())}
						onChange={(newValue) => {
							setBook({
								visible: true,
								dataBook: {
									...book.dataBook,
									releaseDate: dayjs(newValue.$d).format('MM/DD/YYYY'),
								},
							});
							setSelectedDate(newValue.$d);
						}}
						renderInput={(params) => <TextField sx={{width: '100%'}} {...params} helperText={null} />}
					/>
				</DemoItem>
			</Box>
		</LocalizationProvider>
	);
};

export default BookDatePicker;
