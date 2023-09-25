import React from 'react'
import { StyleSheet, Text } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps'

export default function GoogleMapComponent({ onRegionChange, region, locations, userLocation }) {
	return (
		<MapView
			style={{ width: '100%', height: '50%', padding: 100 }}
			onRegionChangeComplete={onRegionChange}
			region={region}
			initialRegion={{
				latitude: 54.6360,
				longitude: -3.3631,
				latitudeDelta: 10,
				longitudeDelta: 10,
			}}
		>
			{userLocation && (
				<Marker
					coordinate={{
						latitude: userLocation.latitude,
						longitude: userLocation.longitude,
					}}
					title="You are here!"
				/>
			)}
			{locations && locations.map(location => (
				<Marker
					key={location._id}
					coordinate={{
						latitude: location.coords[0],
						longitude: location.coords[1],
					}}
					title={location.name}
					description={location.type}
				>
					<Callout>
						<Text>{location.name} - {location.type}</Text>
						<Text>Stars: {location.avStars}</Text>
						<Text>Distance: {location.distanceKm} km</Text>
					</Callout>
				</Marker>
			))}
		</MapView>
	)
}


const styles = StyleSheet.create({
	mapContainer: {

	},
})