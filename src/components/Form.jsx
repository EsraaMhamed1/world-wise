// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import Message from './Message';
import Spinner from './Spinner';
import styles from './Form.module.css';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useUrlPosition } from '../hooks/useUrlPosition';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useCities } from '../contexts/CitiesContext';

function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split('')
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}
const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
	const navigate = useNavigate();
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [cityName, setCityName] = useState('');
	const [country, setCountry] = useState('');
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState('');
	const [emoji, setEmoji] = useState('');

	const [geocodingError, setGeocodingError] = useState('');
	useEffect(
		function () {
			if (!lat && !lng) return;
			async function fetchCityData() {
				try {
					const res = await fetch(
						`${BASE_URL}?latitude=${lat}&longitude=${lng}`
					);
					const data = await res.json();
					if (!data.countryCode) throw new Error('no country');

					setCityName(data.city || data.locality || '');
					setCountry(data.countryName);
					setEmoji(convertToEmoji(data.countryCode));

					setGeocodingError('');
					setIsLoadingGeocoding(true);
				} catch (err) {
					console.error(err);
					setGeocodingError(err.message);
				} finally {
					setIsLoadingGeocoding(false);
				}
			}
			fetchCityData();
		},
		[lat, lng]
	);

	async function handelSubmit(e) {
		e.preventDefault();
		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			date,
			emoji,
			notes,
			position: {
				lat,
				lng,
			},
		};

		await createCity(newCity);
		navigate('/app');
	}
	if (isLoadingGeocoding) return <Spinner />;
	if (geocodingError) return <Message message={geocodingError} />;
	if (!lat && !lng)
		return <Message message={'Start by clicking on the map '} />;
	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ''}`}
			onSubmit={handelSubmit}
		>
			<div className={styles.row}>
				<label htmlFor='cityName'>City name</label>
				<input
					id='cityName'
					onChange={(e) => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor='date'>When did you go to {cityName}?</label>

				<DatePicker
					id='date'
					onChange={(date) => setDate(date)}
					selected={date}
					dateFormat={'dd/mm/yyyy'}
				/>
			</div>

			<div className={styles.row}>
				<label htmlFor='notes'>Notes about your trip to {cityName}</label>
				<textarea
					id='notes'
					onChange={(e) => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type={'primary'}>Add</Button>
				<Button
					type={'back'}
					onClick={(e) => {
						e.preventDefault();
						navigate(-1);
					}}
				>
					&larr; Back
				</Button>

				{/* <button>Add</button>
				<button>&larr; Back</button> */}
			</div>
		</form>
	);
}

export default Form;
