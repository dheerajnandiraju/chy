// screens/RoleSelectionScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  const handleRoleSelect = (role) => {
    switch (role) {
      case 'restaurants':
        navigation.navigate('HomePage');
        break;
      case 'volunteer':
        navigation.navigate('VolunteerDashboard');
        break;
      case 'organizations':
        navigation.navigate('Oldage');
        break;
      case 'farmers':
        navigation.navigate('FarmersDashboard');
        break;
      default:
        break;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      {['restaurants', 'volunteer', 'organizations', 'farmers'].map((role) => (
        <TouchableOpacity
          key={role}
          style={styles.roleButton}
          onPress={() => handleRoleSelect(role)}
        >
          <Text style={styles.roleButtonText}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  roleButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RoleSelectionScreen;
