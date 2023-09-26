import 'react-native-gesture-handler';
import { colours } from "./styles/base";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import HomeScreen from "./components/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from "react-native"
import { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  StyleSheet,
} from "react-native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleLocation from "./components/SingleLocation/SingleLocation";
import { isCurrentUserAuthenticated } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { Provider, useSelector } from 'react-redux';
import store  from './redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function handleSignOut(navigation) {
  signOut(auth)
    .then(() => {
      navigation.navigate('Home')
    })
    .catch((error) => {
      console.log(error)
    });
}
function CustomDrawerContent(props) {
  const { isAuthenticated } = props;
  const profileUrl = useSelector(state => state.profileUrl); 
  console.log('Profile URL', profileUrl)
  return (
    <DrawerContentScrollView {...props}>
       <Image source={
        {uri: profileUrl}
      } style={{width: 80, height: 80, borderRadius:40, marginLeft:10, marginBottom:10}}/>
      <DrawerItemList {...props} />
      {isAuthenticated ? 
      <DrawerItem
        label="Sign Out"
        onPress={() => handleSignOut(props.navigation)}
      />: null}
      {isAuthenticated ? 
       <DrawerItem
        label="Delete Account"
        onPress={() => props.navigation.closeDrawer()}
      /> : null }
    </DrawerContentScrollView>
  );
}

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
 
  isCurrentUserAuthenticated((isAuth)=>{
    
    setIsAuthenticated(isAuth)
  });

  return (
    
    <Drawer.Navigator drawerContent={(props) =>  <CustomDrawerContent isAuthenticated={isAuthenticated} {...props} />}
    screenOptions={
      {drawerPosition:'right',headerShown:false, swipeEdgeWidth: 0}
    } initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false} }/>
        <Drawer.Screen name="Register" component={RegisterUser} options={{headerShown: false, gestureEnabled: true, drawerLabel:'Sign Up', drawerItemStyle: { display: isAuthenticated? 'none':'block' }}}/>
        <Drawer.Screen name="SignIn" component={SignInUser} options={{headerShown: false,gestureEnabled: true, drawerLabel: 'Sign In', drawerItemStyle: { display: isAuthenticated? 'none':'block' }}}/>
        <Drawer.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false,gestureEnabled: true, drawerLabel: 'Reset Password', drawerItemStyle: { display: 'none' } }}/>
        <Drawer.Screen name="Profile" component={Profile} options={{headerShown: false, gestureEnabled: true, drawerItemStyle: { display: !isAuthenticated? 'none':'block' }}}/>
        <Drawer.Screen name="SingleLocation" component={SingleLocation} options={{headerShown: false,gestureEnabled: true, drawerItemStyle: { display: 'none'}}}/>
    </Drawer.Navigator>

  );
}

const StackNavigation = () =>{
  return (
  <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false} }/>
      <Stack.Screen name="Register" component={RegisterUser} options={{headerShown: false, gestureEnabled: true}}/>
      <Stack.Screen name="SignIn" component={SignInUser} options={{headerShown: false, gestureEnabled: true}}/>
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false, gestureEnabled: true}}/>
      <Stack.Screen name="SingleLocation" component={SingleLocation} options={{headerShown: false, gestureEnabled: true}}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false, gestureEnabled: true}}/>
  </Stack.Navigator>
  );
}

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root/> 
    </NavigationContainer>
  </Provider>
  );
}
  //for lake: 650dd24c667ea748708385aa
  //for sea: 650dd24c667ea748708385ad
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
    paddingTop: 200,
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
