import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function LocationPreview({ name, type, distance, avStars }) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.text}>{type}</Text>
			<Text style={styles.text}>{distance} km away</Text>
			<View style={styles.starContainer}>
				{[...Array(5)].map((_, index) => (
					<MaterialIcons
						key={index}
						name='star'
						size={16}
						color={index < avStars ? 'gold' : 'grey'}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderRadius: 5,
		padding: 10,
		marginVertical: 5,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	text: {
		fontSize: 14,
		color: 'grey',
	},
	starContainer: {
		flexDirection: 'row',
		marginTop: 5,
	},
});