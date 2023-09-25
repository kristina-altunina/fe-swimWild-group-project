import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Text, View } from 'react-native';

export default function LocationPermission({ onPermissionChange }) {
	const [permission, setPermission] = useState(null);

	useEffect(() => {
		const requestPermission = () => {
			Location.requestForegroundPermissionsAsync()
				.then(({ status }) => {
					setPermission(status);
					onPermissionChange(status === 'granted')
				})
				.catch((error) => {
					console.error('Error in requesting permission: ', error);
					onPermissionChange(false);
				});
		};
		requestPermission();
	}, []);

	if (permission === 'granted') return <Text>Permission Granted</Text>;
	if (permission === 'denied') return <Text>Permission Denied</Text>;
	return <View />;
}