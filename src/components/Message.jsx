import styles from './Message.module.css';

function Message({ message }) {
	return (
		<p className={styles.message}>
			<span role='img'>👋</span>
			<p>{message}</p>
		</p>
	);
}

export default Message;
