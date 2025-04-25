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
import EmergencyAlerts from './EmergencyAlerts';
import Quality from './Quality';
import { API_ENDPOINTS, handleApiError } from '../../config/api';

const { width } = Dimensions.get('window');

// Updated color palette to match FarmersDashboard, ForumsScreen, Layout, PurchaseDetails, FoodFridges, and EmergencyAlerts
const COLORS = {
  background: '#F9FAFB',   // Soft gray-white background
  primary: '#10B981',     // Vibrant green for primary actions
  secondary: '#6EE7B7',   // Lighter green for gradients
  accent: '#F59E0B',      // Warm yellow for highlights
  textPrimary: '#1F2937', // Dark gray for primary text
  textSecondary: '#6B7280', // Lighter gray for secondary text
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  darkOverlay: 'rgba(17, 24, 39, 0.6)',
};

const OldAgeHomesDashboard = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [priorityLevel, setPriorityLevel] = useState('High');
  const [feedback, setFeedback] = useState('');
  const [availableMeals, setAvailableMeals] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchAvailableMeals();
    if (currentPage === 'trackVolunteer') {
      fetchPendingTasks();
    }
  }, [currentPage]);

  const fetchAvailableMeals = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.RESTAURANT_ALL);
      const data = await response.json();
      console.log('Available meals:', data);
      setAvailableMeals(data);
    } catch (error) {
      console.error('Error fetching available meals:', error);
      const errorData = handleApiError(error);
      alert('Error fetching meals: ' + errorData.message);
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PENDING_TASKS);
      if (!response.ok) {
        throw new Error('Failed to fetch pending tasks');
      }
      const data = await response.json();
      console.log('Pending tasks:', data);
      setPendingTasks(data);
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
      alert('Error fetching pending tasks: ' + error.message);
    }
  };

  const handleRequestMeal = async (mealId) => {
    try {
      console.log('Requesting meal:', mealId);
      
      // First, get the meal details
      console.log('Fetching meal details...');
      const mealResponse = await fetch(API_ENDPOINTS.RESTAURANT_MEAL(mealId));
      if (!mealResponse.ok) {
        const errorData = await mealResponse.json().catch(() => ({ message: 'Failed to fetch meal details' }));
        throw new Error(errorData.message || `Failed to fetch meal details: ${mealResponse.status}`);
      }
      const mealData = await mealResponse.json();
      console.log('Meal details:', mealData);

      // Create an available task
      console.log('Creating available task...');
      const taskResponse = await fetch(API_ENDPOINTS.VOLUNTEER_TASKS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          foodRequestId: mealId,
          sender: {
            name: mealData.restaurantName || 'Restaurant',
            address: mealData.address ? 
              `${mealData.address.street}, ${mealData.address.city}, ${mealData.address.pincode}` : 
              'Address not provided'
          },
          receiver: {
            name: user?.fullName || 'Old Age Home',
            address: user?.address || 'Address not provided'
          },
          foodDetails: {
            foodName: mealData.foodName,
            serves: mealData.serves
          },
          status: 'Available'
        }),
      });

      if (!taskResponse.ok) {
        const errorData = await taskResponse.json().catch(() => ({ message: 'Failed to create task' }));
        throw new Error(errorData.message || `Failed to create task: ${taskResponse.status}`);
      }

      const taskData = await taskResponse.json();
      console.log('Task created:', taskData);

      // Delete the meal from available meals
      console.log('Deleting meal from available meals...');
      const deleteResponse = await fetch(API_ENDPOINTS.RESTAURANT_MEAL(mealId), {
        method: 'DELETE',
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json().catch(() => ({ message: 'Failed to delete meal' }));
        throw new Error(errorData.message || `Failed to delete meal: ${deleteResponse.status}`);
      }

      const deleteData = await deleteResponse.json();
      console.log('Meal deleted:', deleteData);

      alert('Meal requested successfully!');
      fetchAvailableMeals(); // Refresh the available meals list
    } catch (error) {
      console.error('Error requesting meal:', error);
      alert(`Error requesting meal: ${error.message}`);
    }
  };

  const handleConfirmDelivery = async (taskId) => {
    try {
      console.log('Confirming delivery for task:', taskId);
      const response = await fetch(API_ENDPOINTS.CONFIRM_DELIVERY(taskId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to confirm delivery' }));
        throw new Error(errorData.message || `Failed to confirm delivery: ${response.status}`);
      }

      const data = await response.json();
      console.log('Delivery confirmed:', data);
      alert('Delivery confirmed successfully!');
      fetchPendingTasks(); // Refresh the pending tasks list
    } catch (error) {
      console.error('Error confirming delivery:', error);
      alert(`Error confirming delivery: ${error.message}`);
    }
  };

  const renderMainDashboard = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="home-outline" size={24} color={COLORS.textPrimary} />
        <Text style={styles.headerTitle}>Old Age Homes</Text>
      </View>

      <View style={styles.statsContainer}>
        {[
          { value: '120', label: 'Meals' },
          { value: '1.5K', label: 'Total' },
          { value: '5', label: 'Requests' },
        ].map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.quickAccessContainer}>
        {[
          { page: 'meals', icon: 'restaurant-outline', text: 'Meal Requests' },
          { page: 'trackVolunteer', icon: 'location-outline', text: 'Track Volunteer' },
          { page: 'emergencyAlerts', icon: 'alert-circle-outline', text: 'Emergency Alerts' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickAccessItem}
            onPress={() => setCurrentPage(item.page)}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.textPrimary} />
            <Text style={styles.quickAccessText}>{item.text}</Text>
            <View style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.reportsContainer}>
          {[
            { icon: require('../../assets/1.png'), title: 'Monthly Meals', subtitle: 'Meals received this month' },
            { icon: require('../../assets/4.png'), title: 'Yearly Meals', subtitle: 'Total meals received this year' },
          ].map((report, index) => (
            <TouchableOpacity key={index} style={styles.reportItem}>
              <Image source={report.icon} style={styles.reportIcon} />
              <Text style={styles.reportTitle}>{report.title}</Text>
              <Text style={styles.reportSubtitle}>{report.subtitle}</Text>
            </TouchableOpacity>
          ))}
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
          placeholderTextColor={COLORS.textSecondary}
        />
        <TouchableOpacity style={styles.submitFeedbackButton}>
          <Text style={styles.submitFeedbackButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const renderAvailableMeals = () => (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Available Meals</Text>
      {availableMeals.length > 0 ? (
        availableMeals.map((meal) => (
          <View key={meal._id} style={styles.mealItem}>
            <Image source={require('../../assets/100.png')} style={styles.restaurantLogo} />
            <View style={styles.mealInfo}>
              <Text style={styles.restaurantName}>{meal.restaurantName}</Text>
              <Text style={styles.mealDetails}>
                {meal.foodName}, {meal.serves} servings
              </Text>
              <Text style={styles.expiryDetails}>
                Expires in: {meal.expiry.days} days, {meal.expiry.hours} hours
              </Text>
              <TouchableOpacity
                style={styles.requestButton}
                onPress={() => handleRequestMeal(meal._id)}
              >
                <Text style={styles.requestButtonText}>Request Meal</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No meals available at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderTrackVolunteer = () => (
    <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Track Volunteer</Text>
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <View key={task._id} style={styles.taskItem}>
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Delivery from {task.sender?.name || 'Restaurant'}</Text>
              <Text style={styles.taskDetails}>
                {task.foodDetails?.foodName}, {task.foodDetails?.serves} servings
              </Text>
              <Text style={styles.taskStatus}>
                Status: {task.deliveryStatus}
              </Text>
              {task.deliveryStatus === 'Delivered' && (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => handleConfirmDelivery(task._id)}
                >
                  <Text style={styles.confirmButtonText}>Confirm Delivery</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No pending deliveries at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderEmergencyAlerts = () => (
    <ScrollView style={styles.pageContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.pageTitle}>Emergency Alerts</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Urgent Needs</Text>
        <TextInput
          style={styles.input}
          value="Meals for 30 people"
          editable={false}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Contact Details</Text>
        <TextInput
          style={styles.input}
          value="Pre-filled info"
          editable={false}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority Level</Text>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>{priorityLevel}</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.textPrimary} />
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
      {currentPage === 'meals' && renderAvailableMeals()}
      {currentPage === 'trackVolunteer' && <Quality />}
      {currentPage === 'emergencyAlerts' && <EmergencyAlerts />}

      <View style={styles.tabBar}>
        {[
          { page: 'main', icon: 'home-outline' },
          { page: 'meals', icon: 'restaurant-outline' },
          { page: 'trackVolunteer', icon: 'checkmark-circle-outline' },
          { page: 'emergencyAlerts', icon: 'alert-circle-outline' },
        ].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => setCurrentPage(tab.page)}
          >
            <Ionicons
              name={tab.icon}
              size={24}
              color={currentPage === tab.page ? COLORS.primary : COLORS.textSecondary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: COLORS.cardBg,
    marginBottom: 16,
    elevation: 4,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  quickAccessContainer: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 2,
  },
  quickAccessText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: 12,
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  viewButtonText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: '600',
  },
  section: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  reportsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  reportItem: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  reportIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 12,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  reportSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  feedbackSection: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    borderRadius: 12,
    elevation: 4,
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 12,
    elevation: 2,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitFeedbackButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  submitFeedbackButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  pageContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
  },
  restaurantLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  mealInfo: {
    marginLeft: 12,
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
    marginBottom: 4,
  },
  mealDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  expiryDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  requestButton: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  noDataText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 4,
  },
  volunteerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 12,
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    elevation: 4,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  volunteerStatus: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  callButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  callButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.textSecondary,
    elevation: 4,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  raiseAlertButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
  },
  raiseAlertButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  taskItem: {
    backgroundColor: COLORS.cardBg,
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 4,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  taskDetails: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  taskStatus: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OldAgeHomesDashboard;