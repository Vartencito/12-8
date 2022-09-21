import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ImgDetail from '../screens/ImgDetail';
import NewPublication from '../screens/NewPublication';
import Profile from '../screens/Profile';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Comments from '../screens/Comments';

const PictureStack = () => {

    const Stack = createNativeStackNavigator();

    return (
            <Stack.Navigator 
                > 
                <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>                
                <Stack.Screen name='NewPublication' component={NewPublication} options={{headerTitle: ""}}/>
                <Stack.Screen name='Home' component={Home} options={{headerTitle: ""}}/>
                <Stack.Screen name='Search' component={Search} options={{headerTitle: ""}}/>
            </Stack.Navigator> 
    );
}

export default PictureStack;  