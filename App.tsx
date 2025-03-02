import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './src/components/Navigation/BottomTabNavigator';
import SignInScreen from './src/screen/SignInScreen';
import OTPScreen from './src/screen/OTPScreen';
import { RootStackParamList } from './src/types';



const Stack = createStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="OTPScreen" component={OTPScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;