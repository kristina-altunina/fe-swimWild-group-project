import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View,ScrollView } from "react-native"
import NavBar from "./NavBar"
import { styles, props } from "../styles/postSwimSpot"
import { Dropdown } from 'react-native-element-dropdown'
import { useState } from "react"
import StarRating from 'react-native-star-rating'
import Checkbox from 'expo-checkbox';
import { postSwimSpot } from "../scripts/axios"


export default function PostSwimSpot({navigation, route:{params:{location}}})
{
    // const {
    //     date,
    //     location,
    //     notes,
    //     stars,
    //     recordTemp, min: -5, max: 60
    //     feelTemp, ["freezing", "cold", "average", "warm", "hot", null]
    //     mins,
    //     km,
    //     outOfDepth, Boolean
    //     shore,
    //     bankAngle,
    //     clarity,
    //     imgUrls,
    //     size? ["tiny", "small", "medium", "large", null],
    //   } = req.body;

    // const swimSchema = new mongoose.Schema({
    //     date: {
    //       type: Date,
    //       required: true,
    //     },
    //     location: {
    //       type: locationSchema,
    //       required: true,
    //     },
    //     notes: {
    //       type: String,
    //       default: null,
    //     },
    //     stars: {
    //       type: Number,
    //       min: [0, "Too small"],
    //       max: [5, "Too big"],
    //       default: null,
    //     },
    //     recordTemp: {
    //       type: Number,
    //       min: [-5, "Don't lie"],
    //       max: [60, "Don't lie"],
    //       default: null,
    //     },
    //     feelTemp: {
    //       type: String,
    //       enum: ["freezing", "cold", "average", "warm", "hot", null],
    //       default: null,
    //     },
    //     mins: {
    //       type: Number,
    //       default: null,
    //     },
    //     km: {
    //       type: Number,
    //       default: null,
    //     },
    //     outOfDepth: {
    //       type: Boolean,
    //       default: null,
    //     },
    //     sizeKey: {
    //       type: String,
    //       enum: ["tiny", "small", "medium", "large", null],
    //       default: null,
    //     },
    //     shore: {
    //       type: String,
    //       enum: ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy", null],
    //       default: null,
    //     },
    //     bankAngle: {
    //       type: String,
    //       emum: ["shallow", "medium", "steep", "jump-in", null],
    //       default: null,
    //     },
    //     clarity: {
    //       type: String,
    //       enum: ["muddy", "murky", "average", "clear", "perfect", null],
    //       default: null,
    //     },
    //     imgUrls: {
    //       type: [String],
    //       match: [
    //         /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
    //       ],
    //       default: [],
    //     },
    //   });
    const [notes, onChangeNotesInput] = useState('')
    const [starRating, setStartRating] = useState(0)
    const [recordTemp, setRecordTemp] = useState(null)
    const [feelTemp, setFeelTemp] = useState(null)
    const [mins, onChangeMins] = useState(0)
    const [outOfDepth, setOutOfDepth] = useState(false)
    const [size, setSize] = useState('Select Size')
    const [shore, setShore] = useState('Select Shore')
    const [bankAngle, setBankAngle] =useState('Select Bank Angle')
    const [clarity, setClarity] = useState('Select Clarity')
    const [km, onChangeKm] = useState(null)



    function handleFeelTempRef() {
        const feelTempRef = [
            "freezing", "cold", "average", "warm", "hot"]

        return feelTempRef.map((item, i) => {
            return {value: i, label: item}
        })
    }

    function handleSizeRef() {
        const sizeRef = ["tiny", "small", "medium", "large"]

        return sizeRef.map((item, i) => {
            return {value: i, label: item}
        })
    }

    function handleShoreRef() {
        const shoreRef = ["muddy", "rocky", "sandy", "pebbly", "grassy", "swampy"]

        return shoreRef.map((item, i) => {
            return {value: i, label: item}
        })
    }

    function handleBankAngleRef() {
        const bankAngleRef = ["shallow", "medium", "steep", "jump-in"]

        return bankAngleRef.map((item, i) => {
            return {value: i, label: item}
        })
    }

    function handleClarityRef() {
        const clarityRef = ["muddy", "murky", "average", "clear", "perfect"]

        return clarityRef.map((item, i) => {
            return {value: i, label: item}
        })
    }

    

    function handleSubmit() {
        const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImFkNWM1ZTlmNTdjOWI2NDYzYzg1ODQ1YTA4OTlhOWQ0MTI5MmM4YzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3dpbXdpbGQtYzJjYTciLCJhdWQiOiJzd2ltd2lsZC1jMmNhNyIsImF1dGhfdGltZSI6MTY5NTczNjk2NCwidXNlcl9pZCI6IlVIYUtNUXg0TUxickVMbnk3NFVZTXlVQmNPbTIiLCJzdWIiOiJVSGFLTVF4NE1MYnJFTG55NzRVWU15VUJjT20yIiwiaWF0IjoxNjk1NzM2OTY0LCJleHAiOjE2OTU3NDA1NjQsImVtYWlsIjoidGVzdEBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0QG91dGxvb2suY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WdXDSAN9RV9SoyjV4dz_NK9t5Qg-Tg9kBF3Vi3i6kCFXO2cX7ukQ4dZ2QHpnr5hgSPxKpLn1d9WruX_ELtCroA9mioWH3xzQqieJDh-DyWv2oF1gU4o3BUGqua6VQljtBIrGTyVP3GP0i550_RBpSPjeY9PveZsbTHTrUQR574Xwku4YdQoTcBB3vPRKpoW-43EO6PRw4RP01B0wQUMcQqfy0J-zSarOE_zV6m9aKYh95UHV2TWAySR9DWDblO0U7Fg0AzUrReLgiJDYw4zut_Ek12HbZYFuMDo-bHYXk3q06mIhtu7ZSm0L4P4cMpfmwUyIAJN83Sr7WnZakG-nZQ'

        const body = {
            date: new Date(Date.now()).toISOString(),
            location,
            notes,
            stars: starRating,
            recordTemp: +recordTemp,
            feelTemp,
            outOfDepth,
            size,
            shore,
            bankAngle,
            clarity,
            km
        }
        console.log(body)
        postSwimSpot(token, body)
    }

    return (
        <KeyboardAvoidingView
        behavior={props.KeyboardAvoidingView.behavior}
        keyboardVerticalOffset={props.KeyboardAvoidingView.keyboardVerticalOffset}>
            <NavBar navigation={navigation}/>
            <View style={{width: "100%", height: 'auto'}}>

                <Text>
                    location title: location.name
                </Text>
                <Text>
                    Date:
                </Text>
                <Text>
                    {new Date(Date.now()).toDateString()}
                </Text>
                <Text>
                    Location:
                </Text>
                <Text>
                    Notes:
                </Text>
                <View
                style={{
                    borderBottomColor: '#000000',
                    borderBottomWidth: 1,
                }}>
                <TextInput
                    multiline={true}
                    numberOfLines={5}
                    maxLength={250}
                    onChangeText={text => onChangeNotesInput(text)}
                    value={notes}
                    style={{padding: 10}}
                />
                </View>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 3
                }}>
                    <Text>
                        Rating: 
                    </Text>
                    <StarRating
                    disabled={false}
                    maxStars={5}
                    starSize={18}
                    rating={starRating}
                    fullStarColor="yellow"
                    selectedStar={rating => setStartRating(starRating => rating)}
                    />
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>
                        Recorded temp
                    </Text>
                    <TextInput
                    maxLength={2}
                    onChangeText={num => setRecordTemp(recordTemp => num)}
                    value={recordTemp}
                    inputMode="numeric"
                    keyboardType="numeric"
                    style={{padding: 10}}/>
                    <Text>
                        min : -5, max: 60, unit Celsius
                    </Text>
                </View>
                
                <View style={{width: '100%'}}>
                    <Text>
                        Feel Temp: 
                    </Text>
                        <Dropdown
                        data={handleFeelTempRef()}
                        labelField='label'
                        valueField='value'
                        iconColor='black'
                        placeholder='Select temp'
                        onChange={item => { setFeelTemp(feelTemp => item.label)}}/>   
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>
                        mins: 
                    </Text>
                    <TextInput
                        inputMode="numeric"
                        keyboardType="numeric"
                        maxLength={40}
                        onChangeText={num => onChangeMins(num)}
                        value={mins}
                        style={{padding: 10}}
                    />
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>
                        km: 
                    </Text>
                    <TextInput
                        inputMode="numeric"
                        keyboardType="numeric"
                        maxLength={40}
                        onChangeText={num => onChangeKm(num)}
                        value={km}
                        style={{padding: 10}}
                    />
                </View>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>
                        Out of depth: 
                    </Text>
                    <Checkbox
                    disabled={false}
                    value={outOfDepth}
                    onValueChange={val => setOutOfDepth(outOfDepth => val)}/>
                </View>
                <View style={{width: '100%'}}>
                    <Text>
                        Size: 
                    </Text>
                        <Dropdown
                        data={handleSizeRef()}
                        labelField='label'
                        valueField='value'
                        iconColor='black'
                        placeholder={size}
                        onChange={item => { setSize(size => item.label)}}/>   
                </View>
                <View style={{width: '100%'}}>
                    <Text>
                        Shore: 
                    </Text>
                        <Dropdown
                        data={handleShoreRef()}
                        labelField='label'
                        valueField='value'
                        iconColor='black'
                        placeholder={shore}
                        onChange={item => { setShore(shore => item.label)}}/>   
                </View>
                <View style={{width: '100%'}}>
                    <Text>
                        Shore: 
                    </Text>
                        <Dropdown
                        data={handleBankAngleRef()}
                        labelField='label'
                        valueField='value'
                        iconColor='black'
                        placeholder={bankAngle}
                        onChange={item => { setBankAngle(bankAngle => item.label)}}/>   
                </View>
                <View style={{width: '100%', height: '10%'}}>
                    <Text>
                        Clarity: 
                    </Text>
                        <Dropdown
                        data={handleClarityRef()}
                        labelField='label'
                        valueField='value'
                        iconColor='black'
                        placeholder={clarity}
                        onChange={item => { setClarity(clarity => item.label)}}/> 
                </View>
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <Text>
                        submit
                    </Text>
                </TouchableOpacity>
            </View>

            



        </KeyboardAvoidingView>
    )
}