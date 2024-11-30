import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screens/LandingPage';
import FarmersDashboard from './screens/farmers/FarmersDashboard';
<<<<<<< HEAD
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
=======
import FarmersForum from './screens/farmers/FarmersForum';
import PurchaseDetails from './screens/farmers/PurchaseDetails';
import OldAgeHomesDashboard from './screens/oldage/Oldage';
>>>>>>> 9b4e5eea54a97f0c22ed063cc09ef5c876fb7842

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="FarmersDashboard " screenOptions={{headerShown: false}}>
=======
      <Stack.Navigator initialRouteName="Oldage" screenOptions={{headerShown: false}}>
>>>>>>> 9b4e5eea54a97f0c22ed063cc09ef5c876fb7842
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="FarmersDashboard" component={FarmersDashboard}/>
        <Stack.Screen name="FarmersForums" component={FarmersForums}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
<<<<<<< HEAD
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
=======
        <Stack.Screen name="FarmersDashboard" component={FarmersDashboard}/>
        <Stack.Screen name="FarmersForum" component={FarmersForum}/>
        <Stack.Screen name="PurchaseDetails" component={PurchaseDetails} />
        <Stack.Screen name="Oldage" component={OldAgeHomesDashboard} />
>>>>>>> 9b4e5eea54a97f0c22ed063cc09ef5c876fb7842
      </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
}
