import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function GoogleMapComponent({ onRegionChange, region, children }) {
	return (
		<MapView
			style={{width: '100%', height: '50%', padding: 100}}
			onRegionChangeComplete={onRegionChange}
			region={region}
			initialRegion={{
				latitude: 54.6360,
				longitude: -3.3631,
				latitudeDelta: 10,
				longitudeDelta: 10,
			}}
		>
			{children}
		</MapView>
	)
}


const styles = StyleSheet.create({
	mapContainer: {

	},
})