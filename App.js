
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";
import Profile from "./components/Profile";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
<NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={RegisterUser} options={{headerShown: false, gestureEnabled: true}}/>
        <Stack.Screen name="SignIn" component={SignInUser} options={{headerShown: false, gestureEnabled: true}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false, gestureEnabled: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );

function HomeScreen({navigation}) {
  return (
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
            navigation.navigate('Register')}
          }
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
     
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
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

