import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

export default function GoogleMapComponent({ onRegionChange, region, locations }) {
	return (
		<MapView
			style={{ flex: 3 }}
			onRegionChangeComplete={onRegionChange}
			region={region}
			initialRegion={{
				latitude: 54.6360,
				longitude: -3.3631,
				latitudeDelta: 10,
				longitudeDelta: 10,
			}}
		>
			{
				(locations || []).map((location) => {
					console.log('Location: ', location);
					return (
						<Marker
							key={location._id}
							coordinate={{
								latitude: location.coords[0],
								longitude: location.coords[1],
							}}
							title={location.name}
							description={location.type}
						/>
					)
				})
			}
		</MapView>
	)
}


const styles = StyleSheet.create({
	mapContainer: {

	},
})