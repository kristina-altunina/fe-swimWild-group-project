import "react-native-gesture-handler";
import { BACKEND_API_URL } from "@env";
import RegisterUser from "./components/RegisterUser";
import SignInUser from "./components/SignInUser";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import HomeScreen from "./components/HomeScreen";

import { NavigationContainer } from "@react-navigation/native";
import { Image, Text, Alert, StyleSheet } from "react-native";
import { useState } from "react";
import { simpleAlert } from "./extentions";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import SingleLocation from "./components/SingleLocation/SingleLocation";
import SwimSpot from "./components/SwimSpot";
import PostSwims from "./components/PostSwims";
import {
  isCurrentUserAuthenticated,
  deleteCurrentUser,
} from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { auth, tokenRefresh } from "./firebaseConfig";
import { Provider, useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/reducers";
import store from "./redux/store";
import { useFonts } from "expo-font";
import { colours } from "./styles/base";

const Drawer = createDrawerNavigator();

async function handleDeleteAccount(navigation, refresh_token, dispatch) {
  const tokenObj = await tokenRefresh(refresh_token);
  const url = BACKEND_API_URL + "/users/profile";
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenObj.access_token}`,
    },
  });
  if (!response.ok) {
    simpleAlert("Delete Account", "Failed to Delete Account");
  } else {
    deleteCurrentUser(() => {
      console.log("PROFILE DELETED FROM FIREBASE");
    });
    navigation.toggleDrawer();
    navigation.navigate("Home");
    dispatch(logout());
  }
}
function handleSignOut(navigation, dispatch) {
  signOut(auth)
    .then(() => {
      navigation.toggleDrawer();
      dispatch(logout());
      navigation.navigate("Home");
    })
    .catch((error) => {
      console.log("LOGOUT ERROR", error);
    });
}

const createDeleteAccountAlert = (refresh_token, dispatch, props) =>
  Alert.alert(
    "Delete Account",
    "You are about to delete your account.Are you sure?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () =>
          handleDeleteAccount(props.navigation, refresh_token, dispatch),
      },
    ]
  );

function CustomDrawerContent(props) {
  const { isAuthenticated } = props;
  const { profileUrl, name, refresh_token } = useSelector((state) => state);
  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Bold.ttf"),
  });
  const dispatch = useDispatch();

  if (!fontsLoaded) return <></>;

  return (
    <DrawerContentScrollView {...props}>
      {profileUrl ? (
        <Image
          source={{ uri: profileUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginLeft: 10,
            marginBottom: 10,
          }}
        />
      ) : null}
      <Text
        style={{
          margin: 10,
          fontSize: 20,
          fontFamily: "Poppins-Bold",
          color: colours.text,
        }}
      >
        {name}
      </Text>
      <DrawerItemList {...props} />
      {isAuthenticated ? (
        <DrawerItem
          labelStyle={styles.label}
          label="Sign Out"
          onPress={() => {
            handleSignOut(props.navigation, dispatch);
          }}
        />
      ) : null}
      {!isAuthenticated ? (
        <DrawerItem
          labelStyle={styles.label}
          label="Sign In"
          onPress={() => {
            dispatch(logout());
            props.navigation.navigate("SignIn");
          }}
        />
      ) : null}
      {isAuthenticated ? (
        <DrawerItem
          labelStyle={styles.label}
          label="Delete Account"
          onPress={() => {
            createDeleteAccountAlert(refresh_token, dispatch, props);
          }}
        />
      ) : null}
    </DrawerContentScrollView>
  );
}

function Root() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  isCurrentUserAuthenticated((isAuth) => {
    setIsAuthenticated(isAuth);
  });

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent isAuthenticated={isAuthenticated} {...props} />
      )}
      screenOptions={{
        drawerPosition: "right",
        headerShown: false,
        swipeEdgeWidth: 0,
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, drawerLabelStyle: styles.label }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterUser}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerLabel: "Sign Up",
          drawerLabelStyle: styles.label,
          drawerItemStyle: {
            display: isAuthenticated ? "none" : "block",
          },
        }}
      />
      <Drawer.Screen
        name="SignIn"
        component={SignInUser}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerLabel: "Sign In",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerLabel: "Reset Password",
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerLabelStyle: styles.label,
          drawerItemStyle: { display: !isAuthenticated ? "none" : "block" },
        }}
      />
      <Drawer.Screen
        name="SingleLocation"
        component={SingleLocation}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerItemStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        name="SwimSpot"
        component={SwimSpot}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="PostSwims"
        component={PostSwims}
        options={{
          headerShown: false,
          gestureEnabled: true,
          drawerItemStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  label: { fontFamily: "Poppins-SemiBold", fontSize: 16 },
});
