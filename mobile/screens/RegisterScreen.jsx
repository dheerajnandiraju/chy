import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [userRole, setUserRole] = useState('');
  const navigation = useNavigation();

  // Handle Role Selection and Navigation
  const handleRoleSelect = () => {
    if (userRole) {
      navigation.navigate(userRole); // Navigate directly based on the selected role
    } else {
      Alert.alert('Please select a role');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      <Text style={styles.label}>User Role</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userRole}
          onValueChange={setUserRole}
          style={styles.picker}
        >
          <Picker.Item label="Select your role" value="" />
          <Picker.Item label="Restaurants" value="restaurants" />
          <Picker.Item label="NGOs" value="ngos" />
          <Picker.Item label="Volunteer" value="volunteer" />
          <Picker.Item label="Old Age/Orphanage Homes" value="organizations" />
          <Picker.Item label="Farmers" value="farmers" />
        </Picker>
      </View>

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleRoleSelect}
      >
        <Text style={styles.signupButtonText}>Go to {userRole}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    width: '100%',
    maxWidth: 350,
  },
  picker: {
    height: 50,
    width: '100%',
    color: 'gray',
  },
  signupButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    maxWidth: 350,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
