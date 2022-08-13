import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import LogIn from '../screens/LogIn'
import Register from '../screens/Register'
import ImgDetail from '../screens/ImgDetail';
import NewPublication from '../screens/NewPublication'
import Profile from '../screens/Profile'
import Navbar from '../navigation/Navbar';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    
    return (
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                > 
                <Stack.Screen name='Login' component={LogIn}/>
                <Stack.Screen name='Register' component={Register}/>
                <Stack.Screen name='Navbar' component={Navbar}/>
            </Stack.Navigator> 
    );
}

export default MainStack;  