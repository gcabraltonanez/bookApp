import styles from './EmptyState.module.css';

const EmptyState = ({message, icon = 'pi pi-inbox'}) => {
	return (
		<div className={styles.emptyState}>
			<i className={`${icon} ${styles.icon}`}></i>
			<p className={styles.message}>{message}</p>
		</div>
	);
};

export default EmptyState;
