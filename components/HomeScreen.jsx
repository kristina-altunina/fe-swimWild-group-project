import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import { getDistance } from 'geolib';
import LocationSearch from './LocationSearch';
import GoogleMapComponent from './GoogleMapComponent';
import LocationPermission from './LocationPermission';


export default function HomeScreen() {
	const [locations, setLocations] = useState([]);
	const instance = axios.create({
		baseURL: 'https://spike-auth-server.onrender.com/',
	});

	const [region, setRegion] = useState({
		latitude: 54.6360,
		longitude: -3.3631,
		latitudeDelta: 10,
		longitudeDelta: 10,
	});

	const handleLocationSelect = (location) => {
		setRegion({
			...region,
			latitude: location.latitude,
			longitude: location.longitude,
		});
	};

	const handlePermissionChange = (isGranted) => {
		if (isGranted) {
			Location.getCurrentPositionAsync({})
				.then(({ coords }) => {
					setRegion({
						latitude: coords.latitude,
						longitude: coords.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					});
					return instance.get(`locations?lat=${coords.latitude}&lon=${coords.longitude}`);
				})
				.then(({ data }) => {
					const filteredLocations = data.filter(location => {
						const distance = getDistance(
							{ latitude: region.latitude, longitude: region.longitude },
							{ latitude: location.coords[0], longitude: location.coords[1] }
						);
						return distance <= 10000; // 10 km
					});
					setLocations(filteredLocations);
				})
				.catch((error) => {
					console.error('Error in fetching location or locations: ', error);
				});
		} else {
			setRegion({
				latitude: 54.6360, // UK latitude
				longitude: -3.3631, // UK longitude
				latitudeDelta: 10,
				longitudeDelta: 10,
			});
			instance.get(`locations?lat=${region.latitude}&lon=${region.longitude}&limit=5`)
				.then(({ data }) => {
					setLocations(data);
				})
				.catch((error) => {
					console.error('Error fetching popular locations: ', error);
				});
		}
	};

	return (
		<View style={styles.container}>
			<LocationPermission onPermissionChange={handlePermissionChange} />
			<LocationSearch onSelect={handleLocationSelect} />
			<GoogleMapComponent
				region={region}
				onRegionChange={(newRegion) => setRegion(newRegion)}
				locations={locations}
			/>
		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});