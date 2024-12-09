import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
// import CityList from './components/CityList';
// import CountryList from './components/CountryList';
function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route index element={<HomePage />} />
					<Route path='product' element={<Product />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='*' element={<PageNotFound />} />
					<Route path='app' element={<AppLayout />}>
						<Route path='cities' element={<p>cities</p>} />
						<Route path='countries' element={<p>countries</p>} />
					</Route>
					<Route path='login' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
