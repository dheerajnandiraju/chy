import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';
import FarmersDashboard from './screens/farmers/FarmersDashboard';
import FarmersForums from './screens/farmers/FarmersForum';
import LoginScreen from './screens/LoginScreen';
import RestaurantsDashboard from './screens/Restaurants/RestaurantsDashboard';
import RegisterScreen from './screens/RegisterScreen';
import FoodFridges from './screens/FoodFridges/FoodFridges';
import CommunityImpact from './screens/CommunityImpact';
import VolunteerDashboard from './screens/volunteer/VolunteerDashboard';
import Leaderboard from './screens/Restaurants/Leaderboard';
import Notification from './screens/Restaurants/Notification';
import Statistics from './screens/Restaurants/Statistics';
import EmergencyAlerts from './screens/EmergencyAlerts';
import RealTimeFoodTracking from './screens/RealTimeFoodTracking';
import DisasterRelief from './screens/DisasterRelief';
import HomePage from './screens/Restaurants/HomePage';
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FarmersDashboard " screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="FarmersDashboard" component={FarmersDashboard}/>
        <Stack.Screen name="FarmersForums" component={FarmersForums}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name='RestaurantsDashboard' component={RestaurantsDashboard}/>
        <Stack.Screen name="FoodFridges" component={FoodFridges}/>
        <Stack.Screen name="CommunityImpact" component={CommunityImpact}/>
        <Stack.Screen name="VolunteerDashboard" component={VolunteerDashboard}/>
        <Stack.Screen name="EmergencyAlerts" component={EmergencyAlerts}/>
        <Stack.Screen name='RestaurnatsLeaderboard' component={Leaderboard}/>
        <Stack.Screen name='RestaurnatsNotification' component={Notification}/>
        <Stack.Screen name='RestaurnatsStatistics' component={Statistics}/>
        <Stack.Screen name="RealTimeFoodTracking" component={RealTimeFoodTracking} />
        <Stack.Screen name="DisasterRelief" component={DisasterRelief} />
        <Stack.Screen name="HomePage" component={HomePage}/>
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
