import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImgDetail from '../screens/ImgDetail';
import NewPublication from '../screens/NewPublication';
import Profile from '../screens/Profile';

const PictureStack = () => {

    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator 
                > 
                <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>                
                <Stack.Screen name='NewPublication' component={NewPublication} options={{headerTitle: ""}}/>
            </Stack.Navigator> 
    );
}

export default PictureStack;  