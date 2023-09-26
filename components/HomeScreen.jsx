import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, NavigationContainer, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { getDistance } from 'geolib';
import LocationSearch from './LocationSearch';
import GoogleMapComponent from './GoogleMapComponent';
import LocationPermission from './LocationPermission';
import NavBar from './NavBar';
import { getAllLocations } from '../scripts/axios';
import LocationPreview from './LocationPreview';

export default function HomeScreen({ navigation }) {
	const [noLocationsFound, setNoLocationsFound] = useState(false);
	const [userLocation, setUserLocation] = useState(null);
	const [locations, setLocations] = useState([]);
	const [region, setRegion] = useState({
		latitude: 55.36,
		longitude: -3.44,
		latitudeDelta: 10,
		longitudeDelta: 10,
	});

	useEffect(() => {
		getAllLocations()
			.then(data => {
				console.log('DATA: ', data);
				setLocations(locations => [...data])
			})

	}, [])

	const handleRegionSelect = (selectedRegion) => {
		console.log('SELECTED_REGION: ', selectedRegion);
		setRegion({
			latitude: selectedRegion.latitude,
			longitude: selectedRegion.longitude,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
		});
	};

	const handlePermissionChange = (isGranted) => {
		if (isGranted) {
			Location.getCurrentPositionAsync({})
				.then(({ coords }) => {
					const { latitude, longitude } = coords;
					console.log('CURRENT_LOCATION: ', { coords });
					setUserLocation({
						latitude,
						longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					});
					return getAllLocations(`locations?lat=${coords.latitude}&lon=${coords.longitude}`);
				})
				.then(({ data }) => {
					const filteredLocations = data.filter(location => {
						const distance = getDistance(
							{ latitude, longitude },
							// { latitude: userLocation.latitude, longitude: userLocation.longitude },
							{ latitude: location.coords[0], longitude: location.coords[1] }
						) / 1000;
						return distance <= 300; //  km
					});
					if (filteredLocations.length === 0) {
						setNoLocationsFound(true)
					} else {
						setLocations(filteredLocations);
						setNoLocationsFound(false)
						console.log('FILTERED_LOCATIONS: ', filteredLocations[0].name);
					}
				})
				.catch((error) => {
					console.error('Error in fetching location or locations: ', error);
				});
		} else {
			setRegion({
				latitude: 55.36, // UK latitude
				longitude: -3.44, // UK longitude
				latitudeDelta: 10,
				longitudeDelta: 10,
			});
			getAllLocations(`locations?lat=${region.latitude}&lon=${region.longitude}&limit=3`)
				.then(({ data }) => {
					setLocations(data);
					console.log('TOP_LOCATIONS: ', data[0].name);
				})
				.catch((error) => {
					console.error('Error fetching popular locations: ', error);
				});
		}
	};

	const handleRegionChange = (newRegion) => {
		console.log('CHANGE_REGION: ', newRegion);
		setRegion(newRegion);
	}

	function handleClick(uid) {
		return navigation.navigate('SingleLocation', { uid })
	}

	return (
		<View style={styles.container}>
			<NavBar navigation={navigation} />
			<LocationPermission onPermissionChange={handlePermissionChange} />
			<View style={styles.mapContainer}>
				<GoogleMapComponent
					region={region}
					onRegionChange={handleRegionChange}
					locations={locations}
					userLocation={userLocation}
					navigation={navigation}
				/>
				<View style={styles.locationSearch}>
					<LocationSearch style={styles.locationSearch} onSelect={handleRegionSelect} />
				</View>
			</View>

			<View style={styles.locationList}>
				<ScrollView>
					{locations && locations.map(location => (
						<TouchableOpacity onPress={() => handleClick(location._id)}>
							<LocationPreview
								key={location._id}
								name={location.name}
								type={location.type}
								distance={location.distanceKm.toFixed(2)}
								avStars={location.avStars}
							/>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>

			{/* {noLocationsFound && <Text style={styles.noLocationsText}>No locations found nearby!</Text>} */}
		</View>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'fff'
	},
	noLocationsText: {
		color: 'red',
		fontSize: 16,
		textAlign: 'center',
		margin: 10,
	},
	mapContainer: {
		flex: 3
	},
	locationSearch: {
		position: 'absolute',
		top: 10,
		left: 10,
		zIndex: 2,
	},
	locationList: {
		flex: 2
	}
});