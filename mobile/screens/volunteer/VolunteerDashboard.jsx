import React, { useState, useEffect } from 'react';
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
import { API_ENDPOINTS, handleApiError } from '../../config/api';

const { width } = Dimensions.get('window');

const VolunteerDashboard = () => {
  const [currentPage, setCurrentPage] = useState('main');
  const [availableTasks, setAvailableTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchAvailableTasks();
    fetchPendingTasks();
  }, []);

  const fetchAvailableTasks = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.VOLUNTEER_TASKS);
      const data = await response.json();
      console.log('Available tasks:', data);
      setAvailableTasks(data);
    } catch (error) {
      console.error('Error fetching available tasks:', error);
      const errorData = handleApiError(error);
      alert('Error fetching tasks: ' + errorData.message);
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PENDING_TASKS);
      const data = await response.json();
      console.log('Pending tasks:', data);
      setPendingTasks(data);
    } catch (error) {
      console.error('Error fetching pending tasks:', error);
      const errorData = handleApiError(error);
      alert('Error fetching pending tasks: ' + errorData.message);
    }
  };

  const handleAcceptTask = async (taskId) => {
    try {
      console.log('Accepting task:', taskId);
      const response = await fetch(API_ENDPOINTS.ACCEPT_TASK(taskId), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          taskId: taskId,
          volunteerName: user?.fullName || 'Volunteer',
          volunteerContact: user?.contactNumber || '1234567890',
          deliveryStatus: 'Pending'
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        alert('Task accepted successfully!');
        // Refresh both lists
        fetchAvailableTasks();
        fetchPendingTasks();
      } else {
        alert('Failed to accept task: ' + data.message);
      }
    } catch (error) {
      console.error('Error accepting task:', error);
      const errorData = handleApiError(error);
      alert('Error accepting task: ' + errorData.message);
    }
  };

  const handleMarkDelivered = async (taskId) => {
    try {
      const response = await fetch(`${API_ENDPOINTS.PENDING_TASKS}/${taskId}/deliver`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deliveryStatus: 'Delivered'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Task marked as delivered!');
        fetchPendingTasks(); // Refresh the list
      } else {
        alert('Failed to mark task as delivered: ' + data.message);
      }
    } catch (error) {
      console.error('Error marking task as delivered:', error);
      const errorData = handleApiError(error);
      alert('Error marking task as delivered: ' + errorData.message);
    }
  };

  const renderMainDashboard = () => (
    <ScrollView>
      <Text style={styles.welcome}>Welcome, {user?.fullName || 'Volunteer'}!</Text>
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
        <TouchableOpacity style={styles.taskButton} onPress={() => setCurrentPage('tasks')}>
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
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>Available Tasks</Text>
      {availableTasks.length > 0 ? (
        availableTasks.map((task) => (
          <View key={task._id} style={styles.taskItem}>
            <Image source={require('../../assets/67.png')} style={styles.taskImage} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Pickup: {task.sender?.name || 'N/A'}</Text>
              <Text style={styles.taskSubtitle}>Address: {task.sender?.address || 'N/A'}</Text>
              <Text style={styles.taskDetails}>
                Delivery To: {task.receiver?.name || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Delivery Address: {task.receiver?.address || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Food: {task.foodDetails?.foodName || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Servings: {task.foodDetails?.serves || 0}
              </Text>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptTask(task._id)}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No tasks available at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderMyTasks = () => (
    <ScrollView style={styles.pageContainer}>
      <Text style={styles.pageTitle}>My Tasks</Text>
      {pendingTasks.length > 0 ? (
        pendingTasks.map((task) => (
          <View key={task._id} style={styles.taskItem}>
            <Image source={require('../../assets/67.png')} style={styles.taskImage} />
            <View style={styles.taskInfo}>
              <Text style={styles.taskTitle}>Pickup: {task.taskId?.sender?.name || 'N/A'}</Text>
              <Text style={styles.taskSubtitle}>Address: {task.taskId?.sender?.address || 'N/A'}</Text>
              <Text style={styles.taskDetails}>
                Delivery To: {task.taskId?.receiver?.name || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Delivery Address: {task.taskId?.receiver?.address || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Food: {task.taskId?.foodDetails?.foodName || 'N/A'}
              </Text>
              <Text style={styles.taskDetails}>
                Servings: {task.taskId?.foodDetails?.serves || 0}
              </Text>
              <Text style={styles.taskDetails}>
                Accepted: {new Date(task.acceptedAt).toLocaleString()}
              </Text>
              <Text style={styles.taskDetails}>
                Status: {task.deliveryStatus}
              </Text>
              {task.deliveryStatus === 'Pending' && (
                <TouchableOpacity
                  style={styles.deliverButton}
                  onPress={() => handleMarkDelivered(task._id)}
                >
                  <Text style={styles.deliverButtonText}>Mark as Delivered</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No pending tasks at the moment.</Text>
      )}
    </ScrollView>
  );

  const renderLeaderboard = () => (
    <ScrollView style={styles.pageContainer}>
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
      {currentPage === 'tasks' && renderAvailableTasks()}
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
  pageContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 4,
  },
  taskImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  taskInfo: {
    marginLeft: 12,
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
    marginBottom: 4,
  },
  taskSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  taskDetails: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
    lineHeight: 20,
  },
  acceptButton: {
    backgroundColor: '#10B981',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  noDataText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 20,
  },
  mapContainer: {
    marginBottom: 16,
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    elevation: 4,
  },
  taskList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  taskListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskListItemContent: {
    marginLeft: 12,
    flex: 1,
  },
  taskListText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2A44',
  },
  taskListSubtext: {
    fontSize: 14,
    color: '#6B7280',
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
  deliverButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  deliverButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default VolunteerDashboard;

