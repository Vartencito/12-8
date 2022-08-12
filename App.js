import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogIn from "./src/screens/LogIn";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navbar from "./src/navigation/Navbar";
import { TokenProvider } from "./src/context/AuthContext";
//rnfe


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <TokenProvider>

      <Stack.Navigator initialRouteName="Login">

        <Stack.Screen
          name="Login"
          component={LogIn}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Nav"
          component={Navbar}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>
      </TokenProvider>

    </NavigationContainer>


  );
  //Termina Nav
}


