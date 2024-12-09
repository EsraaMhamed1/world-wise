import styles from './Message.module.css';

function Message() {
	return (
		<p className={styles.message}>
			<span role='img'>👋</span>
			<p>hello</p>
		</p>
	);
}

export default Message;
