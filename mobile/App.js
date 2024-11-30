import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import FarmersDashboard from './screens/farmers/FarmersDashboard';
import FarmersForum from './screens/farmers/FarmersForum';
import PurchaseDetails from './screens/farmers/PurchaseDetails';
import TemporaryMap from './screens/Maps';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FarmersDashboard" screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="FarmersDashboard" component={FarmersDashboard}/>
        <Stack.Screen name="FarmersForum" component={FarmersForum}/>
        <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
        <Stack.Screen name="TemporaryMap" component={TemporaryMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
