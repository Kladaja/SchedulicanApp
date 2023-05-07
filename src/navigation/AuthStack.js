import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing the screens
import LoginScreen from '../screens/AuthStack/LoginScreen';
import RegisterScreen from '../screens/AuthStack/RegisterScreen';

const Stack = createStackNavigator();

// Creating a stack navigator for the screens for the unauthenticated user
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={LoginScreen} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
