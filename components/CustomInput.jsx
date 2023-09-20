import { useState } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { colours } from '../styles/base'
const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <>
    <View> 
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput, 
          focusedInput === touched[name] && styles.input_focused
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onFocus={() => setFocusedInput(touched[name])}
        onBlur={() => {
          setFocusedInput(null)
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderColor: colours.accent4,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    color: colours.accent1,
  },
  input_focused: {
    borderColor: colours.accent4,
    borderWidth: 2,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginBottom: 10,
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default CustomInput