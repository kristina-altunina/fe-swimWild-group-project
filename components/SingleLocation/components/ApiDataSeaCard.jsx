import { styles } from '../../../styles/apiDataCard'
import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation, ActivityIndicator, Modal, TouchableOpacity } from "react-native"
import { getLocationByID } from '../../../scripts/axios'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function ApiDataSeaCard({ apiData, uid }) {
	const [showForecast, setShowForecast] = useState(false)
	const [selectedForecastDate, setSelectedForecastDate] = useState('Today')
	const [dataToDisplay, setDataToDisplay] = useState({})
	const [isLoading, setIsLoading] = useState(false);
	const [dayBar, setDayBar] = useState(['Today']);
	const [popupArr, setPopupArr] = useState([]);
	const daysRef = ['Mon',
		'Tue',
		'Wed',
		'Thurs',
		'Fri',
		'Sat',
		'Sun']

	useEffect(() => {
		setIsLoading(isLoading => !isLoading)
		!Object.keys(dataToDisplay).length
			? setDataToDisplay(dataToDisplay => {
				setIsLoading(isLoading => !isLoading)
				return apiData
			})
			: getLocationByID(uid, dayBar.indexOf(selectedForecastDate))
				.then(({ apiData }) => {
					setIsLoading(isLoading => !isLoading)
					setDataToDisplay(dataToDisplay => apiData)
				})
				.catch(err => {
					console.log(err)
				})
	}, [selectedForecastDate, setDataToDisplay])

	useEffect(() => {
		if (dayBar.length !== 7) {
			setDayBar(dayBar => {
				let currentDay = daysRef.indexOf(new Date(apiData.weather.values.datetimeStr).toDateString().split(' ')[0]);
				const arr = [];

				while (arr.length !== 6) {
					if (currentDay < 6) {
						currentDay++
						arr.push(daysRef[currentDay])
					} else {
						currentDay = 0
						arr.push(daysRef[currentDay])
					}
				}

				return [...dayBar, ...arr]
			})
		}
	}, [])

	function handleShowForecast() {
		setShowForecast(showForecast => !showForecast)
	}

	function handleSelectedForecast(i) {
		setSelectedForecastDate(selectedForecastDate => {
			return i
		})
	}

	function handleForecastDateStyle(i) {
		if (i === dayBar.indexOf(selectedForecastDate)) {
			return styles.selectedForecastDate
		} else {
			return styles.forecastDates
		}
	}

	if (!Object.keys(dataToDisplay).length) {
		return (
			<>
				<ActivityIndicator size='large' />
			</>
		)
	}

	return (
		<TouchableWithoutFeedback onPress={() => {
			handleShowForecast()
			LayoutAnimation.configureNext({
				duration: 300,
				create:
				{
					type: LayoutAnimation.Types.easeInEaseOut,
					property: LayoutAnimation.Properties.opacity,
				},
				update:
				{
					type: LayoutAnimation.Types.easeInEaseOut,
				}
			})
		}}>
			<View style={styles.swimBot}>
				<Text style={styles.titleText}>
					Forecast
				</Text>
				{
					showForecast
						? (
							<>
								<View style={styles.forecastDatesContainer}>
									{
										dayBar.map((date, i) => {
											return (
												<Text style={handleForecastDateStyle(i)} key={i} onPress={() => handleSelectedForecast(date)}>
													{date}
												</Text>
											)
										})
									}
								</View>
								{
									isLoading
										? (
											<ActivityIndicator size='large' />
										)
										: (
											<View style={styles.expandedDataContainer}>
												<Text style={styles.expandedDataText}>
													Date: {new Date(dataToDisplay?.weather.values.datetimeStr).toDateString()}
												</Text>
												<Text style={styles.expandedDataText}>
													Temperature: {dataToDisplay?.tempCelsius} °C
												</Text>
												<Text style={styles.expandedDataText}>
													Max Wave: {dataToDisplay?.waveData.maxWave}
												</Text>
												<Text style={styles.expandedDataText}>
													Max Wave Period: {dataToDisplay?.waveData.maxWavePeriod}
												</Text>
												<Text style={styles.expandedDataText}>
													Cloud Cover: {dataToDisplay?.weather.values.cloudcover} %
												</Text>
												<Text style={styles.expandedDataText}>
													Visibility: {dataToDisplay?.weather.values.visibility} mi
												</Text>
												{
													!!dataToDisplay?.weather.values.snowdepth && (
														<>
															<Text style={styles.expandedDataText}>
																Snow depth: {dataToDisplay?.weather.values.snowdepth} cm
															</Text>
														</>
													)
												}
												<Text style={styles.expandedDataText}>
													Wind Speed: {dataToDisplay?.weather.values.wspd} mph
												</Text>
												<Text style={styles.expandedDataText}>
													Conditions: {dataToDisplay?.weather.values.conditions}
												</Text>
												{
													dataToDisplay?.tides.highTides.length && (
														<>
															<Text style={styles.expandedDataText}>
																High Tide:
															</Text>
															{
																dataToDisplay?.tides.highTides.map((time, i) => {
																	return (
																		<Text style={styles.expandedDataTidesText} key={i}>
																			{new Date(time).toTimeString().split(' ')[0]}
																		</Text>
																	)
																})
															}
														</>
													)
												}
												<Text style={styles.expandedDataText}>
													Low Tide:
												</Text>
												{
													dataToDisplay?.tides.lowTides.map((time, i) => {
														return (
															<Text style={styles.expandedDataTidesText} key={i}>
																{new Date(time).toTimeString().split(' ')[0]}
															</Text>
														)
													})
												}
											</View>
										)
								}
							</>
						)
						: (
							<>
								{
									isLoading
										? (
											<ActivityIndicator size='large' />
										)
										: (
											<>
												<Text style={styles.displayText}>
													Temperature: {dataToDisplay?.tempCelsius} °C
												</Text>
												<View style={styles.textWithInfoContainer}>
													<Text style={styles.displayText}>
														Max Wave: {dataToDisplay?.waveData.maxWave}
													</Text>
													<TouchableOpacity
														onPress={() => setPopupArr(popupArr => [...popupArr, 'maxWave'])} >
														<Ionicons
															name="md-information-circle-outline"
															size={24} color="white" />
													</TouchableOpacity>
												</View>
												<Modal
													visible={popupArr.includes('maxWave')}
													transparent={true}
													animationType='slide'>
													<TouchableOpacity
														onPress={() => setPopupArr(popupArr => popupArr.filter(item => item !== 'maxWave'))}
														style={styles.popupContainerSetup}>
														<View style={styles.popupContainer}>
															<Text style={styles.popupTitle}>
																Max Wave
															</Text>
															<Text style={styles.popupDetails}>
																Wave height is affected by wind speed, wind duration (or how long the wind blows), and fetch, which is the distance over water that the wind blows in a single direction. If wind speed is slow, only small waves result, regardless of wind duration or fetch.
															</Text>
														</View>
													</TouchableOpacity>
												</Modal>
												<View style={styles.textWithInfoContainer}>
													<Text style={styles.displayText}>
														Max Wave Period: {dataToDisplay?.waveData.maxWavePeriod}
													</Text>
													<TouchableOpacity
														onPress={() => setPopupArr(popupArr => [...popupArr, 'maxWavePeriod'])}>
														<Ionicons
															name="md-information-circle-outline"
															size={24} color="white" />
													</TouchableOpacity>
												</View>
												<Modal
													visible={popupArr.includes('maxWavePeriod')}
													transparent={true}
													animationType='slide'>
													<TouchableOpacity
														onPress={() => setPopupArr(popupArr => popupArr.filter(item => item !== 'maxWavePeriod'))}
														style={styles.popupContainerSetup}>
														<View style={styles.popupContainer}>
															<Text style={styles.popupTitle}>
																Max Wave Period
															</Text>
															<Text style={styles.popupDetails}>
																Wave period is measured in seconds and is the gap between one wave and the next. Simply said the wave period is the amount in seconds that pass between each wave. The higher the wave period, the more energy in the swell and so the larger the wave and more often than not this results in better quality waves for surfing.
															</Text>
														</View>
													</TouchableOpacity>
												</Modal>
												<Text style={styles.highlightText}>
													See Forecast...
												</Text>
											</>
										)
								}
							</>
						)
				}
			</View>
		</TouchableWithoutFeedback>
	)
}

