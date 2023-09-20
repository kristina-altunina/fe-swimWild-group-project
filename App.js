import { colours } from "./styles/base";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar";
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_900Black,
  Poppins_500Medium,
  Poppins_300Light_Italic,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleLocation from "./components/SingleLocation";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterUser} options={{headerShown: false, gestureEnabled: true}}/>
        <Stack.Screen name="SignIn" component={SignInUser} options={{headerShown: false, gestureEnabled: true}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false, gestureEnabled: true}}/>
        <Stack.Screen name="SingleLocation" component={SingleLocation} options={{headerShown: false, gestureEnabled: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

function HomeScreen({navigation}) {

  let [fontsLoaded] = useFonts({
    Poppins_600SemiBold,
    Poppins_900Black,
    Poppins_500Medium,
    Poppins_300Light_Italic,
    Poppins_200ExtraLight,
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <View style={styles.app}>
     <NavBar/>
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('SignIn')
            }}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>
        
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Register')
            }}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <Button title="test Location" onPress={() => {navigation.navigate('SingleLocation', {uid: '650830dcc6e566c71d559fc3'})}}></Button>
      </View>
    </View>
    )
    
  }
}
  
const styles = StyleSheet.create({
  app: {
    backgroundColor: colours.bg,
    height: "100%",
    width: "100%",
  },
  header: {
    backgroundColor: colours.accent1,
    height: "fit-content",
    color: colours.text,
    marginTop: 50,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header__titleContainer: {
    margin: 10,
  },
  header__title: {
    fontSize: 32,
    fontFamily: "Poppins_900Black",
    color: colours.text,
  },
  header__titleAccent: {
    color: colours.accent4,
  },
  header__buttons: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around",
  },
  header__button: {
    marginRight: 20,
  },
  header__buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: colours.bg,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "50%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 5,
    padding: 5,
  },
  button: {
    width: "50%",
    alignItems: "center",
    backgroundColor: "#ababab",
    padding: 5,
    borderRadius: 3,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
