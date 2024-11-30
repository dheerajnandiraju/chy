import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Footer = ({ navigation, isDriver }) => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('Home');

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  const isActive = (tabName) => activeTab === tabName;

  return (
    <View style={styles.footer}>
      {/* Home Tab */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('HomePage')}>
        <Icon name="home-outline" size={24} color={isActive('HomePag') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('Home') && styles.activeText]}>Home</Text>
      </TouchableOpacity>

      {/* Dashboard Tab */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('RestaurantsDashboard')}>
        <Icon name="apps-outline" size={24} color={isActive('Dashboard') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('Dashboard') && styles.activeText]}>Dashboard</Text>
      </TouchableOpacity>

      {/* Leaderboard Tab */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('RestaurnatsLeaderboard')}>
        <Icon name="trophy-outline" size={24} color={isActive('Leaderboard') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('Leaderboard') && styles.activeText]}>Leaderboard</Text>
      </TouchableOpacity>

      {/* Statistics Tab */}
      <TouchableOpacity style={styles.footerItem} onPress={() => navigation.navigate('RestaurnatsStatistics')}>
        <Icon name="bar-chart-outline" size={24} color={isActive('Statistics') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('Statistics') && styles.activeText]}>Statistics</Text>
      </TouchableOpacity>

      {/* Profile Tab (Common for both Driver and Passenger) */}
     
    </View>
  );
};

const Layout = ({ children = null, navigation = {} }) => {
  const isDriver = false; // Determine user role (driver/passenger)

  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <Footer navigation={navigation} isDriver={isDriver} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    paddingBottom: 80, // Adjust padding to accommodate the footer height
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    alignItems: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  activeIconBackground: {
    backgroundColor: '#e0f7ff',
    padding: 8,
    borderRadius: 16,
  },
  activeText: {
    color: '#007bff',
  },
});

export default Layout;
