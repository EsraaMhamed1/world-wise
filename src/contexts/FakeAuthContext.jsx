import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const intialState = {
	user: null,
	isAuthinticated: false,
};

function reducer(state, action) {
	switch (action.type) {
		case 'login':
			return {
				...state,
				user: action.payload,
				isAuthinticated: true,
			};
		case 'logout':
			return {
				...state,
				user: null,
				isAuthinticated: false,
			};
	}
}

const FAKE_USER = {
	name: 'Jack',
	email: 'jack@gmail.com',
	password: 'qwerty',
	avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
	const [{ user, isAuthinticated }, dispatch] = useReducer(
		reducer,
		intialState
	);

	function auth(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password)
			dispatch({ type: 'login', payload: FAKE_USER });
	}

	function logout() {
		dispatch({ type: 'logout' });
	}

	return (
		<AuthContext.Provider value={{ user, isAuthinticated, auth, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined)
		throw new Error('useAuth must be used within an AuthProvider');
	return context;
}

export { AuthProvider, useAuth };
