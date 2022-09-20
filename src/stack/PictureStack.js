import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImgDetail from '../screens/ImgDetail';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Comments from '../screens/Comments';


const PictureStack = () => {

    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator> 
                <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>                
                <Stack.Screen name='ImgDetail' component={ImgDetail} options={{headerTitle: ""}}/>
                <Stack.Screen name='Profile' component={Profile} options={{headerTitle: ""}}/>
                <Stack.Screen name='Comments' component={Comments} options={{headerTitle: ""}}/>
            </Stack.Navigator> 
    );
}

export default PictureStack;  