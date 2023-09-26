import { useEffect, useState } from "react"
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/infoCard"
import Ionicons from '@expo/vector-icons/Ionicons'

export default function InfoCard({ info }) {
	const [expandData, setExpandData] = useState(false)

	function handleWarnings(data) {
		return (
			<>
				{
					data.map((item, i) => {
						return (
							<>
								<Text style={styles.displayText}>
									{item}
								</Text>
							</>
						)
					})
				}
			</>
		)
	}

	return (
		<>
			<TouchableWithoutFeedback onPress={() => {
				setExpandData(expandData => !expandData)
				LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
			}}>
				{
					!Object.keys(info).length
						? (
							<ActivityIndicator size='large' />
						)
						: (
							<View style={styles.infoData}>
								<Text style={styles.titleText}>
									Recommendations
								</Text>
								{
									!expandData
										? (
											<>
												<Text style={styles.displayText}>
													{info.msg}
												</Text>
												<Text style={styles.displayText}>
													Disclaimer:{`\n`}{info.disclaimer}
												</Text>
												{
													info.warnings.length && (
														<View style={styles.textWithInfoContainer}>
															<Text style={styles.displayText}>
																Warnings
															</Text>
															<Ionicons name="alert-circle-outline"
																size={24} color="red" />
														</View>
													)
												}
											</>
										)
										: (
											<>
												{
													info.warnings.length
														? (
															<>
																{
																	handleWarnings(info.warnings)
																}
															</>
														)
														: (
															<Text>No warnings</Text>
														)
												}
											</>
										)
								}
							</View>
						)
				}

			</TouchableWithoutFeedback>
		</>
	)
}