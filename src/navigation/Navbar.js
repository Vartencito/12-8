import { StyleSheet, Text, View } from "react-native";
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Ionicons from "react-native-vector-icons/Ionicons";
import NewPublication from '../screens/NewPublication';
import { NavigationContainer } from "@react-navigation/native";
import ImgDetail from "../screens/ImgDetail";
import LogIn from '../screens/LogIn';
import Register from '../screens/Register';
import PictureStack from "../stack/PictureStack";
import PublicationStack from "../stack/PublicationStack"
import Search from "../screens/Search";
const Tab = createBottomTabNavigator();

const Navbar = () => {

  return (

    <Tab.Navigator
      style={styles.navbottom}
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 80 },
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {

          let iconName;
          let rn = route.name;

          if (rn === "NewPub") {
            iconName = focused ? "home" : "home";
          }
          else if (rn === "Home") {
            iconName = focused ? "list" : "list-outline";
          }
          else if (rn === "Profile") {
            iconName = focused ? "person" : "person";
          }
       
          return <Ionicons name={iconName} size={40} color={color} />;
        },
      })}

      tabBarOptions={{
        showLabel: false,
        tabBarLabel: false,
        activeTintColor: '#ED4855',
        inactiveTintColor: '#fff',
        activeBackgroundColor: '#9D2932',
        inactiveBackgroundColor: '#9D2932',
        style: {
          backgroundColor: '#CE4418',
          paddingBottom: 3,
          backgroundImage: "./src/img/navbar.svg",
        }
      }}
    >
      <Tab.Screen name="Home" component={PictureStack} />
      <Tab.Screen name="NewPub" component={Search} />
      <Tab.Screen name="Profile" component={PublicationStack} />
    </Tab.Navigator>

  )
}
export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E49C7A",
    alignItems: "center",
    justifyContent: "center",
  },
  navbottom: {
    backgroundColor: "9D29320",
  }

});