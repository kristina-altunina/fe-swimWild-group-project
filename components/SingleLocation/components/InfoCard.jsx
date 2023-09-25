import { useEffect, useState } from "react"
import { View, TouchableWithoutFeedback, Text, LayoutAnimation, ActivityIndicator } from "react-native"
import { styles } from "../../../styles/infoCard"

export default function InfoCard({info}) {
    console.log(info, 'here')
    const [expandData, setExpandData] = useState(false)

    function handleWarnings(data) {
        return (
            <>
            {
                data.map((item, i) => {
                    return (
                        <>
                        <Text>
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
                    <ActivityIndicator size='large'/>
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
                                <Text>
                                    {info.msg}
                                </Text>
                                <Text>
                                    Disclaimer: {info.disclaimer}
                                </Text>
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