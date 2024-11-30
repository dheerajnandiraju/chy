import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const Footer = ({ navigation }) => {
  const route = useRoute();
  const [activeTab, setActiveTab] = useState('FarmersDashboard');

  useEffect(() => {
    setActiveTab(route.name);
  }, [route]);

  const isActive = (tabName) => activeTab === tabName;

  return (
    <View style={styles.footer}>
      {/* Farmers Dashboard Tab */}
      <TouchableOpacity 
        style={styles.footerItem} 
        onPress={() => navigation.navigate('FarmersDashboard')}>
        <Icon name="home-outline" size={24} color={isActive('FarmersDashboard') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('FarmersDashboard') && styles.activeText]}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.footerItem} 
        onPress={() => navigation.navigate('FarmersForum')}>
        <Icon name="chatbox-outline" size={24} color={isActive('FarmersForum') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('FarmersForum') && styles.activeText]}>Forum</Text>
      </TouchableOpacity>
      {/* notification Tab */}
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => navigation.navigate('Notifications')}>
        <Icon name="notifications-outline" size={24} color={isActive('Notifications') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('Notifications') && styles.activeText]}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.footerItem} 
        onPress={() => navigation.navigate('FarmerResources')}>
        <Icon name="file-tray-outline" size={24} color={isActive('FarmerResources') ? '#007bff' : '#777'} />
        <Text style={[styles.footerText, isActive('FarmerResources') && styles.activeText]}>Resources</Text>
      </TouchableOpacity>
    </View>
  );
};

const Layout = ({ children = null, navigation = {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  activeText: {
    color: '#007bff',
  },
});

export default Layout;
