import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FarmersDashboard = () => {
  const navigation = useNavigation();
  
  // States for produce and stats
  const [produceType, setProduceType] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Stats for pending/completed purchases
  const [pendingPurchases, setPendingPurchases] = useState(3);
  const [completedPurchases, setCompletedPurchases] = useState(2);

  const handlePostProduce = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Navigate to Purchase Details
  const navigateToPurchaseDetails = (type) => {
    navigation.navigate('PurchaseDetails', { purchaseType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.headerTitle}>Farmers Dashboard</Text>
        </View>

        <Text style={styles.welcome}>Welcome, John Smith!</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>500 kg</Text>
            <Text style={styles.statLabel}>Donated</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5,000 meals</Text>
            <Text style={styles.statLabel}>Meals</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$200</Text>
            <Text style={styles.statLabel}>Tax</Text>
          </View>
        </View>

      {/* TODO: work on this form */}
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Post Produce</Text>
          <Text style={styles.label}>Produce Type</Text>
          <TextInput
            style={styles.input}
            value={produceType}
            onChangeText={setProduceType}
            placeholder="Enter Produce Type"
          />

          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            style={styles.input}
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            placeholder="Additional notes (e.g., handle with care)"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={handlePostProduce}>
            <Text style={styles.buttonText}>Post for Pickup</Text>
          </TouchableOpacity>
        </View>

        {showSuccess && (
          <View style={styles.successMessage}>
            <Ionicons name="checkmark-circle" size={24} color="green" />
            <Text style={styles.successText}>
              Produce posted successfully! NGOs and volunteers will be notified.
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Purchase Stats</Text>
          
          <TouchableOpacity onPress={() => navigateToPurchaseDetails('pending')}>
            <Text style={styles.statsLabel}>Pending Purchases</Text>
            <Text style={styles.statsValue}>{pendingPurchases}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigateToPurchaseDetails('completed')}>
            <Text style={styles.statsLabel}>Completed Purchases</Text>
            <Text style={styles.statsValue}>{completedPurchases}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact Tracker</Text>
          <Text style={styles.impactTitle}>Meals Generated</Text>
          <Text style={styles.impactValue}>5000 meals</Text>
          <Text style={styles.impactGrowth}>+10%</Text>
        </View>
      </ScrollView>
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
    flexWrap: 'wrap',
    padding: 16,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ffe6',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  successText: {
    flex: 1,
    marginHorizontal: 8,
  },
  section: {
    padding: 16,
  },
  statsLabel: {
    fontSize: 16,
    color: '#666',
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 16,
    color: '#666',
  },
  impactValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  impactGrowth: {
    color: '#4CAF50',
    fontSize: 16,
  },
});

export default FarmersDashboard;
