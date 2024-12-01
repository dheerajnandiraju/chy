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
import { Language } from '../components/language';

const RegisterScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (fullName && email && phoneNumber && password && address && userRole) {
      if (!/^\d{10}$/.test(phoneNumber)) {
        Alert.alert('Invalid phone number', 'Please enter a valid phone number.');
        return;
      }

      try {
        setLoading(true);

        const response = await fetch('http://192.168.43.41:3030/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName,
            email,
            phoneNumber,
            password,
            address,
            userRole,
          }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.status === 201) {
          setSuccessMessage('Your account has been created successfully. Please login.');
          Alert.alert('Signup Successful');
          navigation.navigate('LoginScreen');
        } else {
          Alert.alert('Error', data.message || 'Something went wrong');
        }
      } catch (error) {
        setLoading(false);
        Alert.alert('Error', 'No response from the server');
      }
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />

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
      <Language />
      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signupButtonText}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginPrompt}>Already have an account? Login</Text>
      </TouchableOpacity>

      {successMessage ? (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle-outline" size={20} color="green" />
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      ) : null}
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
  input: {
    height: 55,
    backgroundColor: '#f0f0f0',
    paddingLeft: 10,
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 15,
    width: '100%',
    maxWidth: 350,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    maxWidth: 350,
  },
  inputField: {
    flex: 1,
    height: 55,
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
  loginPrompt: {
    color: '#1e90ff',
    textAlign: 'center',
    marginTop: 15,
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ffed',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    width: '100%',
    maxWidth: 350,
  },
  successText: {
    color: 'green',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default RegisterScreen;
