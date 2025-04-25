import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Layout from './Layout';
import { useAuth } from '../../context/AuthContext';
import { API_ENDPOINTS, handleApiError } from '../../config/api';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2A44',
  },
  restaurantName: {
    color: '#10B981',
    fontWeight: '800',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardFullWidth: {
    width: '100%',
  },
  cardIcon: {
    marginRight: 12,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2A44',
  },
  postContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2A44',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2A44',
    marginBottom: 16,
  },
  pickerContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    fontSize: 16,
    color: '#1F2A44',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    width: 80,
    marginRight: 12,
    fontSize: 16,
    color: '#1F2A44',
  },
  button: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  quoteContainer: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    opacity: 0.7,
  },
});

const RestaurantsDashboard = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const RestaurantName = user?.fullName;

  const [items, setItems] = useState('');
  const [serveFor, setServeFor] = useState('');
  const [expireTime, setExpireTime] = useState({ days: '', hours: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handlePostMeal = async () => {
    try {
      if (!items || !serveFor) {
        alert('Please fill in all required fields');
        return;
      }

      setIsLoading(true);
      console.log('Attempting to post meal to:', API_ENDPOINTS.RESTAURANT_POST);

      const foodData = {
        foodName: items,
        serves: Number(serveFor),
        expiry: {
          days: Number(expireTime.days || 0),
          hours: Number(expireTime.hours || 0),
        },
        address: user?.address || {
          street: 'srinivasa colony rdno:1',
          city: 'hyderabad',
          pincode: '500035',
          latitude: 0,
          longitude: 0,
        },
      };

      console.log('Sending food data:', foodData);

      const response = await fetch(API_ENDPOINTS.RESTAURANT_POST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(foodData),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        alert('Meal posted successfully!');
        setItems('');
        setServeFor('');
        setExpireTime({ days: '', hours: '' });
        console.log('Food posted:', data);
      } else {
        const errorData = handleApiError({ response: { data, status: response.status } });
        alert('Failed to post meal: ' + errorData.message);
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Full error object:', error);
      const errorData = handleApiError(error);
      alert('Error occurred while posting the meal: ' + errorData.message);
      console.error('Error:', errorData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>
            Welcome <Text style={styles.restaurantName}>{RestaurantName}</Text>
          </Text>
          <TouchableOpacity onPress={() => handleIconPress('RestaurnatsNotification')}>
            <Icon name="bell" size={24} color="#1F2A44" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Icon name="truck" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>120</Text>
          </View>
          <View style={styles.card}>
            <FontAwesome5 name="utensils" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>1.5K</Text>
          </View>
          <View style={[styles.card, styles.cardFullWidth]}>
            <FontAwesome5 name="award" size={24} color="#10B981" style={styles.cardIcon} />
            <Text style={styles.cardText}>3</Text>
          </View>
        </View>

        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>Post a Meal</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter the list of items"
            placeholderTextColor="#6B7280"
            onChangeText={setItems}
            value={items}
            editable={!isLoading}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serveFor}
              onValueChange={(itemValue) => setServeFor(itemValue)}
              style={styles.picker}
              enabled={!isLoading}
            >
              <Picker.Item label="Select number of people" value="" />
              {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                <Picker.Item key={num} label={`${num} People`} value={num} />
              ))}
            </Picker>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Expiration Time</Text>
            <View style={styles.timeInputContainer}>
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                placeholder="Days"
                placeholderTextColor="#6B7280"
                onChangeText={(value) => setExpireTime({ ...expireTime, days: value })}
                value={expireTime.days}
                editable={!isLoading}
              />
              <TextInput
                style={styles.timeInput}
                keyboardType="numeric"
                placeholder="Hours"
                placeholderTextColor="#6B7280"
                onChangeText={(value) => setExpireTime({ ...expireTime, hours: value })}
                value={expireTime.hours}
                editable={!isLoading}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]} 
            onPress={handlePostMeal}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Posting...' : 'Post Meal'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>
            "A meal shared is a life touched. Your generosity can bring hope and change someone's day."
          </Text>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default RestaurantsDashboard;
