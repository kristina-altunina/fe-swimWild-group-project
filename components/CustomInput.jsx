import { useState } from 'react'
import { Text, TextInput, View } from 'react-native'
import { styles } from '../styles/layout'

export default CustomInput = (props) => {
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
