import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Updated import
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Layout from './Layout';
import { useAuth } from '../../context/AuthContext';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F6F8F9',
    paddingTop: 30,
    padding: 25,
    flex: 1,
  },
  burger: {
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row',
  },
  smallFont: {
    fontSize: 16,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    fontStyle: 'italic',
    color: 'green', // Bold weight and color
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',  // Tomato color to highlight the restaurant name // Underlined for extra emphasis
  },
  toprow: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  post: {
    shadowColor: 'red',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 8,
    marginTop: 10,
    backgroundColor: 'white',
    height: '100%',
    backgroundSize: 'cover',
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#17C6ED',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  dropdown: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  picker: {
    borderWidth: 3,
    backgroundColor: '#ffff', // Ensure picker border is visible
    borderColor: 'gray',
    borderRadius: 5,
    borderStyle: 'solid',
    padding: 1,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#17C6ED',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 80,
  },
  button: {
    backgroundColor: '#17C6ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff', // Change background color as needed
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  quoteContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#17C6ED',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const showAlert = () => {
  alert('Hello, this is an alert!');
};

const RestaurantsDashboard = () => {
  const navigation = useNavigation();

  // Use the useAuth hook inside the component
  const { user } = useAuth();
  const RestaurantName = user?.fullName;
  console.log(user)

  const [items, setItems] = useState('');
  const [serveFor, setServeFor] = useState('');
  const [expireTime, setExpireTime] = useState({ days: '', hours: '' });

  const handlePostMeal = async () => {
    try {
      const orderData = {
        restaurantId: user.id,  // Pass the restaurant's user ID here
        mealType: items,  // e.g. "Pasta, Salad"
        servings: serveFor,  // Number of people
        expirationDays: expireTime.days,  // Days
        expirationHours: expireTime.hours,  // Hours
        restaurantLocation: user?.address,
        contactNumber:user?.contactNumber,  // Assuming user address is the restaurant's location
      };
  
      const response = await fetch('http://192.168.43.41:3030/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Successfully posted the meal
        alert('Meal posted successfully!');
        console.log('Order posted:', data);
      } else {
        // Error posting the meal
        alert('Failed to post meal: ' + data.error);
        console.error('Error:', data.error);
      }
    } catch (error) {
      alert('Error occurred while posting the meal.');
      console.error('Error:', error);
    }
  };
  

  const handleIconPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <Layout navigation={navigation}>
      <ScrollView>
        <View style={styles.screen}>
          <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View style={styles.burger}>
              <Text>Welcome <Text style={styles.restaurantName}>{RestaurantName}</Text></Text>
            </View>
            <TouchableOpacity onPress={() => handleIconPress('RestaurnatsNotification')}>
              <Icon name="bell" size={20} color="black" />
            </TouchableOpacity>
          </View>
          
          <View>
            <View style={styles.toprow}>
              <View style={styles.card}>
                <Icon name="truck" size={20} color="black" />
                <Text style={styles.text}>120</Text>
              </View>
              <View style={styles.card}>
                <FontAwesome5 name="utensils" size={24} color="black" />
                <Text style={styles.text}>1.5K</Text>
              </View>
            </View>

            <View style={[styles.card, { width: '100%', marginTop: 10 }]}>
              <FontAwesome5 name="award" size={24} color="black" />
              <Text style={styles.text}>3</Text>
            </View>
          </View>

          <View style={styles.post}>
            <Text style={styles.title}>Post a Meal</Text>

            <TextInput
              style={styles.input}
              placeholder="Enter the list of items"
              onChangeText={setItems}
              value={items}
            />

            <View style={styles.dropdown}>
              <Text style={styles.label}>Serve for</Text>
              <Picker
                selectedValue={serveFor}
                onValueChange={(itemValue) => setServeFor(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select" value="" />
                {Array.from({ length: 100 }, (_, i) => i + 1).map((num) => (
                  <Picker.Item key={num} label={`${num} People`} value={num} />
                ))}
              </Picker>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.label}>Expire time:</Text>
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  keyboardType="numeric"
                  placeholder="Days"
                  onChangeText={(value) => setExpireTime({ ...expireTime, days: value })}
                  value={expireTime.days.toString()}
                />
                <TextInput
                  style={styles.timeInput}
                  keyboardType="numeric"
                  placeholder="Hrs"
                  onChangeText={(value) => setExpireTime({ ...expireTime, hours: value })}
                  value={expireTime.hours.toString()}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handlePostMeal}>
              <Text style={styles.buttonText}>Post Meal</Text>
            </TouchableOpacity>
          </View>

          {/* Motivational Quote Section */}
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              "A meal shared is a life touched. Your generosity can bring hope and change someone's day. Thank you for making a difference"
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default RestaurantsDashboard;
