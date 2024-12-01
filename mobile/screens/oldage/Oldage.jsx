import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');


const OldAgeHomesDashboard = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [priorityLevel, setPriorityLevel] = useState('High');
  const [feedback, setFeedback] = useState('');
  const [mealRequests, setMealRequests] = useState([]);
  const {user} = useAuth();
  console.log(user)

  useEffect(() => {
      fetchMealRequests();
  }, [currentPage]);

  const fetchMealRequests = async () => {
    try {
      const response = await fetch('http://192.168.43.41:3000/api/orders');
      const data = await response.json();
      console.log("Orders : ",data)
      const data1 = data.orders.filter(each => each.status === "Pending");
      console.log(data1)
      setMealRequests(data1);

    } catch (error) {
      console.error('Error fetching meal requests:', error);
    }
  };

  const handleCheckout = async (orderId) => {
    try {
      const response = await fetch(`http://192.168.43.41:3000/api/orders/${orderId}/organization`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name:user.fullName,
          location: user.address,
          phoneNumber:user.contactNumber,
        }),
      });
      console.log(response)

      if (response.status === 200) {
        alert('Order checked out successfully!');
        setMealRequests(mealRequests.filter(order => order._id !== orderId));
      }
    } catch (error) {
      console.error('Error checking out meal:', error);
      alert('Failed to check out the meal request. Please try again.');
    }
  };

  const renderMainDashboard = () => (
    <ScrollView>
      <View style={styles.header}>
        <Ionicons name="home-outline" size={24} color="#000" />
        <Text style={styles.headerTitle}>Old Age Homes...</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>120</Text>
          <Text style={styles.statLabel}>Meals</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>1.5K</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Requests</Text>
        </View>
      </View>

      <View style={styles.quickAccessContainer}>
        <TouchableOpacity style={styles.quickAccessItem} onPress={() => setCurrentPage('mealRequests')}>
          <Ionicons name="restaurant-outline" size={24} color="#000" />
          <Text style={styles.quickAccessText}>Meal Requests</Text>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem} onPress={() => setCurrentPage('trackVolunteer')}>
          <Ionicons name="location-outline" size={24} color="#000" />
          <Text style={styles.quickAccessText}>Track Volunteer</Text>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAccessItem} onPress={() => setCurrentPage('emergencyAlerts')}>
          <Ionicons name="alert-circle-outline" size={24} color="#000" />
          <Text style={styles.quickAccessText}>Emergency Alerts</Text>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>View</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.reportsContainer}>
          <TouchableOpacity style={styles.reportItem}>
            <Image source={require('../../assets/1.png')} style={styles.reportIcon} />
            <Text style={styles.reportTitle}>Monthly Meals</Text>
            <Text style={styles.reportSubtitle}>Meals received this month</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reportItem}>
            <Image source={require('../../assets/4.png')} style={styles.reportIcon} />
            <Text style={styles.reportTitle}>Yearly Meals</Text>
            <Text style={styles.reportSubtitle}>Total meals received this year</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.feedbackSection}>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="The meal was excellent and timely."
        />
        <TouchableOpacity style={styles.submitFeedbackButton}>
          <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderMealRequests = () => (
    <ScrollView>
      <Text style={styles.pageTitle}>Meal Requests</Text>
      {mealRequests.length > 0 ? (
        mealRequests.map((order) => (
          <View key={order._id} style={styles.mealRequestItem}>
            <Image source={require('../../assets/100.png')} style={styles.restaurantLogo} />
            <View style={styles.mealRequestInfo}>
              <Text style={styles.restaurantName}>{order.restaurant.name}</Text>
              <Text style={styles.mealDetails}>{order.mealType}, {order.servings} servings, expiring in {order.expirationDays} days, {order.expirationHours} hours</Text>
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={() => handleCheckout(order._id)}
              >
                <Text style={styles.checkoutButtonText}>Check Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No meal requests available at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderTrackVolunteer = () => (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Track Volunteer</Text>
      <Image source={require('../../assets/76.png')} style={styles.mapImage} />
      <View style={styles.volunteerInfo}>
        <Text style={styles.volunteerName}>John Doe</Text>
        <Text style={styles.volunteerStatus}>5 minutes away</Text>
      </View>
      <TouchableOpacity style={styles.callButton}>
        <Text style={styles.callButtonText}>Call John Doe</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderEmergencyAlerts = () => (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Emergency Alerts</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Urgent Needs</Text>
        <TextInput style={styles.input} value="Meals for 30 people" editable={false} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Contact Details</Text>
        <TextInput style={styles.input} value="Pre-filled info" editable={false} />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority Level</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text>{priorityLevel}</Text>
          <Ionicons name="chevron-down" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.raiseAlertButton}>
        <Text style={styles.raiseAlertButtonText}>Raise Alert</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {currentPage === 'main' && renderMainDashboard()}
      {currentPage === 'mealRequests' && renderMealRequests()}
      {currentPage === 'trackVolunteer' && renderTrackVolunteer()}
      {currentPage === 'emergencyAlerts' && renderEmergencyAlerts()}

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentPage('main')}>
          <Ionicons name="home-outline" size={24} color={currentPage === 'main' ? "#007AFF" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentPage('mealRequests')}>
          <Ionicons name="restaurant-outline" size={24} color={currentPage === 'mealRequests' ? "#007AFF" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentPage('trackVolunteer')}>
          <Ionicons name="location-outline" size={24} color={currentPage === 'trackVolunteer' ? "#007AFF" : "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentPage('emergencyAlerts')}>
          <Ionicons name="alert-circle-outline" size={24} color={currentPage === 'emergencyAlerts' ? "#007AFF" : "#000"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 8 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 16, backgroundColor: '#FFF', marginBottom: 16 },
  statBox: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: '#666' },
  quickAccessContainer: { backgroundColor: '#FFF', padding: 16, marginBottom: 16 },
  quickAccessItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  quickAccessText: { fontSize: 16, flex: 1, marginLeft: 16 },
  viewButton: { backgroundColor: '#E0E0E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 4 },
  viewButtonText: { fontSize: 14 },
  section: { backgroundColor: '#FFF', padding: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  reportsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  reportItem: { alignItems: 'center', width: '48%' },
  reportIcon: { width: 60, height: 60, marginBottom: 8 },
  reportTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  reportSubtitle: { fontSize: 12, color: '#666', textAlign: 'center' },
  feedbackSection: { marginTop: 32 },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitFeedbackButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  submitFeedbackButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  mealRequestItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  restaurantLogo: { width: 50, height: 50, borderRadius: 25 },
  mealRequestInfo: { marginLeft: 16, flex: 1 },
  restaurantName: { fontSize: 16, fontWeight: 'bold' },
  mealDetails: { fontSize: 14, color: '#666' },
  checkoutButton: { marginTop: 8, backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 4 },
  checkoutButtonText: { color: '#FFF', fontWeight: 'bold' },
  mapImage: { width: '100%', height: 200, borderRadius: 8, marginBottom: 16 },
  volunteerInfo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  volunteerName: { fontSize: 16, fontWeight: 'bold' },
  volunteerStatus: { fontSize: 14, color: '#666' },
  callButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  callButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: '#E0E0E0', backgroundColor: '#FFF', paddingVertical: 8 },
  tabItem: { alignItems: 'center', justifyContent: 'center', paddingVertical: 8 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16 },
  dropdown: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  raiseAlertButton: { backgroundColor: '#007AFF', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  raiseAlertButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});

export default OldAgeHomesDashboard;
