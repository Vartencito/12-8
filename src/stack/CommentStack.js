import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Navbar from '../navigation/Navbar';
import Comments from '../screens/Comments';

const Stack = createNativeStackNavigator();

const CommentStack = () => {
    
    return (
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                }}
                > 
                <Stack.Screen name='Comments' component={Comments}/>
                <Stack.Screen name='Home' component={Home}/>
            </Stack.Navigator> 
    );
}

export default CommentStack;  