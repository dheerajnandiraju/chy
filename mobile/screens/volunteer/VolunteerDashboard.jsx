import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

const { width } = Dimensions.get('window');

const VolunteerDashboard = () => {
  const [currentPage, setCurrentPage] = useState('main');
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
    console.log("Orders : ",data.orders)
    const data1 = data.orders.filter(each => each.status === "In Progress");
    console.log(data1)
    setMealRequests(data1);
  } catch (error) {
    console.error('Error fetching meal requests:', error);
  }
};

 const handleAccept = async (orderId) => {
   try{
    const response = await fetch(`http://192.168.43.41:3000/api/orders/${orderId}/volunteer`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:user.fullName,
        extra: user.address,
        phoneNumber:user.contactNumber,
      }),

    });
    console.log(response)

    if (response.status === 200) {
      alert('Order checked out successfully!');
      setMealRequests(mealRequests.filter(order => order._id !== orderId));
    }

   }catch(error){
     console.error('Error accepting meal request:', error);
   }
 }

  const renderMainDashboard = () => (
    <ScrollView>
      <Text style={styles.welcome}>Welcome, John Doe!</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>25</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>150</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Rank</Text>
        </View>
      </View>

      <View style={styles.tasksContainer}>
        <TouchableOpacity style={styles.taskButton} onPress={() => setCurrentPage('availableTasks')}>
          <Ionicons name="list-outline" size={24} color="#000" />
          <Text style={styles.taskButtonText}>Available Tasks</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskButton} onPress={() => setCurrentPage('myTasks')}>
          <Ionicons name="checkbox-outline" size={24} color="#000" />
          <Text style={styles.taskButtonText}>My Tasks</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.taskButton} onPress={() => setCurrentPage('leaderboard')}>
          <Ionicons name="trophy-outline" size={24} color="#000" />
          <Text style={styles.taskButtonText}>Leaderboard</Text>
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.rewardsSection}>
        <Text style={styles.sectionTitle}>Rewards</Text>
        <View style={styles.rewardsContainer}>
          <View style={styles.rewardItem}>
            <Image
              source={require('../../assets/21.png')}
              style={styles.rewardImage}
            />
            <Text style={styles.rewardTitle}>Certificate</Text>
            <Text style={styles.rewardSubtitle}>Downloadable</Text>
          </View>
          <View style={styles.rewardItem}>
            <Image
              source={require('../../assets/55.png')}
              style={styles.rewardImage}
            />
            <Text style={styles.rewardTitle}>Free Course</Text>
            <Text style={styles.rewardSubtitle}>Claim Now</Text>
          </View>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: '50%' }]} />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>Start</Text>
            <Text style={[styles.progressLabel, styles.activeLabel]}>Pickup</Text>
            <Text style={styles.progressLabel}>Deliver</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderAvailableTasks = () => (
    <ScrollView>
      <Text style={styles.pageTitle}>Available Tasks</Text>
      {mealRequests.map(each =>(
        <View style={styles.taskItem} key={each._id}>
        <Image
          source={require('../../assets/67.png')}
          style={styles.taskImage}
        />
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>Pickup: {each.restaurant.name}</Text>
          <Text style={styles.taskSubtitle}>Delivery: {each.organization.name}</Text>
        </View>
        <TouchableOpacity style={styles.acceptButton} >
          <Text style={styles.acceptButtonText} onPress={()=> handleAccept(each._id)}>Accept</Text>
        </TouchableOpacity>
      </View>
      ))}
      {/* Add more task items here */}
    </ScrollView>
  );

  const renderMyTasks = () => (
    <ScrollView>
      <Text style={styles.pageTitle}>My Tasks</Text>
      <View style={styles.mapContainer}>
        <Image
          source={require('../../assets/77.png')}
          style={styles.mapImage}
        />
      </View>
      <View style={styles.taskList}>
        <View style={styles.taskListItem}>
          <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          <View style={styles.taskListItemContent}>
            <Text style={styles.taskListText}>Task 1</Text>
            <Text style={styles.taskListSubtext}>Delivered to Food Bank</Text>
          </View>
        </View>
        <View style={styles.taskListItem}>
          <Ionicons name="time" size={24} color="#FFC107" />
          <View style={styles.taskListItemContent}>
            <Text style={styles.taskListText}>Task 2</Text>
            <Text style={styles.taskListSubtext}>Pickup from Joe's Diner</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView>
      <Text style={styles.pageTitle}>Leaderboard</Text>
      <View style={styles.leaderboardItem}>
        <Image
          source={require('../../assets/91.png')}
          style={styles.leaderboardAvatar}
        />
        <Text style={styles.leaderboardName}>Alice Johnson</Text>
        <Text style={styles.leaderboardScore}>50</Text>
      </View>
      <View style={styles.leaderboardItem}>
        <Image
          source={require('../../assets/82.png')}
          style={styles.leaderboardAvatar}
        />
        <Text style={styles.leaderboardName}>Bob Smith</Text>
        <Text style={styles.leaderboardScore}>45</Text>
      </View>
      <View style={styles.leaderboardItem}>
        <Image
          source={require('../../assets/99.png')}
          style={styles.leaderboardAvatar}
        />
        <Text style={styles.leaderboardName}>Charlie Lee</Text>
        <Text style={styles.leaderboardScore}>40</Text>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {currentPage !== 'main' && (
          <TouchableOpacity onPress={() => setCurrentPage('main')}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>Volunteer Dashboard</Text>
      </View>
      {currentPage === 'main' && renderMainDashboard()}
      {currentPage === 'availableTasks' && renderAvailableTasks()}
      {currentPage === 'myTasks' && renderMyTasks()}
      {currentPage === 'leaderboard' && renderLeaderboard()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  tasksContainer: {
    padding: 16,
  },
  taskButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 12,
  },
  taskButtonText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  rewardsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rewardItem: {
    alignItems: 'center',
  },
  rewardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeLabel: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  acceptButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    padding: 16,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  taskList: {
    padding: 16,
  },
  taskListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskListItemContent: {
    marginLeft: 16,
  },
  taskListText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskListSubtext: {
    fontSize: 14,
    color: '#666',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  leaderboardAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  leaderboardScore: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VolunteerDashboard;

