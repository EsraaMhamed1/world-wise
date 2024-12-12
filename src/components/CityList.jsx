import styles from './CityList.module.css';
import Spinner from './Spinner';
import CityItem from './CityItem';
import Message from './Message';

export default function CityList({ cities, isLoading }) {
	if (isLoading) return <Spinner />;
	if (!cities)
		return (
			<Message
				message={'Add your First city by clicking on a city on the map '}
			/>
		);

	return (
		<ul className={styles.cityList}>
			{cities.map((city) => (
				<CityItem key={city.id} city={city} />
			))}
		</ul>
	);
}
