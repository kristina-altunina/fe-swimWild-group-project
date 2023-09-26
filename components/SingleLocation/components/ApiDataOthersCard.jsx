import { styles } from '../../../styles/apiDataCard'
import { useEffect, useState } from "react"
import { TouchableWithoutFeedback, Text, View, LayoutAnimation, ActivityIndicator, Modal, TouchableOpacity } from "react-native"
import { getLocationByID } from '../../../scripts/axios'
import { Dropdown } from 'react-native-element-dropdown'
import Ionicons from '@expo/vector-icons/Ionicons'


export default function ApiDataSeaCard({ apiData, uid }) {
	const [showForecast, setShowForecast] = useState(false);
	const [selectedForecastDate, setSelectedForecastDate] = useState('Today');
	const [dataToDisplay, setDataToDisplay] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [dayBar, setDayBar] = useState(['Today']);
	const [siteData, setSiteData] = useState([])
	const [selectedSite, setSelectedSite] = useState(0);
	const [popupArr, setPopupArr] = useState([])
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
			: getLocationByID(uid, dayBar.indexOf(selectedForecastDate), selectedSite)
				.then(({ apiData }) => {
					setIsLoading(isLoading => !isLoading)
					setDataToDisplay(dataToDisplay => apiData)
				})
				.catch(err => {
					console.log(err)
				})

		setSiteData(siteData => apiData.hydrologyData.nearby.map((site, i) => {
			return { value: i, label: site.name }
		}))

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

	useEffect(() => {
		setIsLoading(isLoading => !isLoading)
		getLocationByID(uid, dayBar.indexOf(selectedForecastDate), selectedSite)
			.then(({ apiData }) => {
				setIsLoading(isLoading => !isLoading)
				setDataToDisplay(dataToDisplay => apiData)
			})
			.catch(err => {
				console.log(err)
			})
	}, [selectedSite])

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
				<Text>test others card</Text>
			</>
		)
	}

	return (
		<TouchableWithoutFeedback onPress={() => {
			handleShowForecast()
			LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
		}}>
			<View style={styles.swimBot}>
				<View style={styles.textWithInfoContainerCentered}>
					<Text style={styles.titleText}>
						Forecast
					</Text>
					<TouchableOpacity
						onPress={() => setPopupArr(popupArr => [...popupArr, 'forecast'])}>
						<Ionicons name="md-information-circle-outline"
							size={24} color="white" />
					</TouchableOpacity>
				</View>
				<Modal
					visible={popupArr.includes('forecast')}
					transparent={true}
					animationType='slide'
				>
					<TouchableOpacity
						onPress={() => setPopupArr(popupArr => popupArr.filter(item => item !== 'forecast'))}
						style={styles.popupContainerSetup}>
						<View style={styles.popupContainer}>
							<Text style={styles.popupTitle}>
								Forecast
							</Text>
							<Text style={styles.popupDetails}>
								These forecasted data are gathered from the displayed Hydrology site. If you wish to change the Hydrology Site, you can press on the site and choose from which site you want to get the data from.{'\n'}{'\n'}
								You may also view the forcasted data within the week. Press on the Forecast data display and select from which day you wish to see.
							</Text>
						</View>
					</TouchableOpacity>
				</Modal>
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
													Temperature: {dataToDisplay?.hydrologyData.data[0]?.maxSurfaceTemp} °C
												</Text>
												<View style={styles.textWithInfoContainer}>
													<Text style={styles.displayText}>
														Oxygen Saturation: {dataToDisplay?.hydrologyData.data[1]?.mostRecentValue}%
													</Text>
													<TouchableOpacity onPress={() => setPopupArr(popupArr => [...popupArr, 'oxygenSaturation'])}>
														<Ionicons name="md-information-circle-outline" size={18} color="white" />
													</TouchableOpacity>
													<Modal
														visible={popupArr.includes('oxygenSaturation')}
														transparent={true}
														animationType='slide'
													>
														<TouchableOpacity
															onPress={() => setPopupArr(popupArr => popupArr.filter(item => item !== 'oxygenSaturation'))}
															style={styles.popupContainerSetup}>
															<View style={styles.popupContainer}>
																<Text style={styles.popupTitle}>
																	Oxygen Saturation
																</Text>
																<Text style={styles.popupDetails}>
																	Water at lower temperatures should have higher mg/L of dissolved oxygen and higher %DO while warmer, polluted waters will have lower mg/L and %DO.{'\n'}{'\n'}
																	Healthy water should generally have dissolved oxygen concentrations above 6.5-8 mg/L and between about 80-120 %.
																</Text>
															</View>
														</TouchableOpacity>
													</Modal>
												</View>
												<Text style={styles.expandedDataText}>
													Cloud Cover: {dataToDisplay?.weather.values.cloudcover}%
												</Text>
												<Text style={styles.expandedDataText}>
													Visibility: {dataToDisplay?.weather.values.visibility} mi
												</Text>
												{!!dataToDisplay?.weather.values.snowdepth && (
													<>
														<Text style={styles.expandedDataText}>
															snowdepth: {dataToDisplay?.weather.values.snowdepth} cm
														</Text>
													</>
												)}
												<Text style={styles.expandedDataText}>
													Wind Speed: {dataToDisplay?.weather.values.wspd} mph
												</Text>
												<Text style={styles.expandedDataText}>
													Conditions: {dataToDisplay?.weather.values.conditions}
												</Text>
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
												<Dropdown
													data={siteData}
													labelField='label'
													valueField='value'
													placeholderStyle={styles.displayText}
													selectedTextStyle={styles.displayText}
													iconColor='white'
													placeholder={'Hydrology Site: ' + siteData[selectedSite].label}
													onChange={item => {
														console.log(item.value)
														setSelectedSite(selectedSite => item.value)
													}} />
												<Text style={styles.displayText}>
													Site Id: {dataToDisplay?.hydrologyData.siteId}
												</Text>
												<Text style={styles.displayText}>
													Temperature: {dataToDisplay?.hydrologyData.data[0]?.maxSurfaceTemp} °C
												</Text>
												<View style={styles.textWithInfoContainer}>
													<Text style={styles.displayText}>
														Oxygen Saturation: {dataToDisplay?.hydrologyData.data[1]?.mostRecentValue}%
													</Text>
													<TouchableOpacity onPress={() => setPopupArr(popupArr => [...popupArr, 'oxygenSaturation'])}>
														<Ionicons name="md-information-circle-outline" size={18} color="white" />
													</TouchableOpacity>
												</View>
												<Modal
													visible={popupArr.includes('oxygenSaturation')}
													transparent={true}
													animationType='slide'
												>
													<TouchableOpacity
														onPress={() => setPopupArr(popupArr => popupArr.filter(item => item !== 'oxygenSaturation'))}
														style={styles.popupContainerSetup}>
														<View style={styles.popupContainer}>
															<Text style={styles.popupTitle}>
																Oxygen Saturation
															</Text>
															<Text style={styles.popupDetails}>
																Water at lower temperatures should have higher mg/L of dissolved oxygen and higher %DO while warmer, polluted waters will have lower mg/L and %DO.{'\n'}{'\n'}
																Healthy water should generally have dissolved oxygen concentrations above 6.5-8 mg/L and between about 80-120 %.
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

