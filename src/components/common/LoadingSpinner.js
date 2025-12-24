import {ProgressSpinner} from 'primereact/progressspinner';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({message = 'Cargando...'}) => {
	return (
		<div className={styles.spinnerContainer}>
			<ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth='4' />
			<p className={styles.loadingMessage}>{message}</p>
		</div>
	);
};

export default LoadingSpinner;
