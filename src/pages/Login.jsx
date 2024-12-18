import { useState, useEffect } from 'react';
import styles from './Login.module.css';
import PageNav from '../components/PageNav';
import Button from '../components/Button';
import { useAuth } from '../contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState('jack@gmail.com');
	const [password, setPassword] = useState('qwerty');

	const { auth, isAuthinticated } = useAuth();
	const navigate = useNavigate();

	function handelSubmit(e) {
		e.preventDefault();
		if (email && password) auth(email, password);
	}

	useEffect(
		function () {
			if (isAuthinticated) navigate('/app', { replace: true });
		},
		[isAuthinticated, navigate]
	);
	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handelSubmit}>
				<div className={styles.row}>
					<label htmlFor='email'>Email address</label>
					<input
						type='email'
						id='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>

				<div className={styles.row}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>

				<div>
					<Button type='primary'>Login</Button>
				</div>
			</form>
		</main>
	);
}
