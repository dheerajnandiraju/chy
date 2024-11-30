import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Sample Data for Alerts and Impact Metrics
const emergencyAlerts = [
  { id: 1, urgency: 'High', reason: 'Fire', location: { latitude: 37.78825, longitude: -122.4324 }, status: 'Open' },
  { id: 2, urgency: 'Medium', reason: 'Flood', location: { latitude: 37.78945, longitude: -122.4354 }, status: 'Closed' },
  { id: 3, urgency: 'Low', reason: 'Accident', location: { latitude: 37.79125, longitude: -122.4384 }, status: 'Open' },
];

const EmergencyAlerts = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [alertStatus, setAlertStatus] = useState('In Progress');
  const [emergencyData, setEmergencyData] = useState({
    urgency: '',
    reason: '',
    location: '',
    contactInfo: '',
    additionalDetails: '',
  });

  // Impact Metrics (for demonstration purposes)
  const impactMetrics = {
    totalAlerts: 25,
    avgResponseTime: '2 hours',
    beneficiaries: 300,
    mealsDelivered: 1500,
  };

  const handleRespondToAlert = (alert) => {
    setSelectedAlert(alert);
    setShowModal(true); // Show the modal when a user wants to respond to an alert
  };

  const handleSubmitResponse = () => {
    console.log('Response submitted:', { alertId: selectedAlert.id, responseText, alertStatus });
    setShowModal(false); // Close modal after submission
    setResponseText('');
    setAlertStatus('In Progress');
  };

  const handleRaiseEmergency = () => {
    // Handle submitting the emergency form (e.g., send data to a server)
    console.log('Emergency Raised:', emergencyData);
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. Raise an Emergency Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Raise an Emergency</Text>
        <TextInput
          style={styles.input}
          placeholder="Urgency Level (e.g., High)"
          value={emergencyData.urgency}
          onChangeText={(text) => setEmergencyData({ ...emergencyData, urgency: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Reason for Alert (e.g., Fire)"
          value={emergencyData.reason}
          onChangeText={(text) => setEmergencyData({ ...emergencyData, reason: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={emergencyData.location}
          onChangeText={(text) => setEmergencyData({ ...emergencyData, location: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Information"
          value={emergencyData.contactInfo}
          onChangeText={(text) => setEmergencyData({ ...emergencyData, contactInfo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Additional Details"
          value={emergencyData.additionalDetails}
          onChangeText={(text) => setEmergencyData({ ...emergencyData, additionalDetails: text })}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleRaiseEmergency}>
          <Text style={styles.submitButtonText}>Raise Emergency</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Track Your Alerts Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Track Your Alerts</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {emergencyAlerts.map((alert) => (
            <View key={alert.id} style={styles.card}>
              <Text style={styles.cardText}>Reason: {alert.reason}</Text>
              <Text style={styles.cardText}>Urgency: {alert.urgency}</Text>
              <Text style={styles.cardText}>Status: {alert.status}</Text>
              <TouchableOpacity
                style={styles.responseButton}
                onPress={() => handleRespondToAlert(alert)} // Show modal on response click
              >
                <Text style={styles.responseButtonText}>Respond</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {emergencyAlerts.map((alert, index) => (
              <Marker
                key={index}
                coordinate={alert.location}
                title={alert.reason}
                description={`Urgency: ${alert.urgency}`}
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* 3. Impact Metrics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <View style={styles.metricCard}>
          <Text style={styles.metricText}>Total Alerts: {impactMetrics.totalAlerts}</Text>
          <Text style={styles.metricText}>Avg Response Time: {impactMetrics.avgResponseTime}</Text>
          <Text style={styles.metricText}>Beneficiaries Reached: {impactMetrics.beneficiaries}</Text>
          <Text style={styles.metricText}>Meals Delivered: {impactMetrics.mealsDelivered}</Text>
        </View>
      </View>

      {/* 4. Respond to Alert Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {selectedAlert && (
              <>
                <Text style={styles.modalTitle}>Respond to Alert</Text>
                <Text style={styles.modalText}>Reason: {selectedAlert.reason}</Text>
                <Text style={styles.modalText}>Urgency: {selectedAlert.urgency}</Text>
                <Text style={styles.modalText}>Status: {selectedAlert.status}</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Your Response"
                  value={responseText}
                  onChangeText={setResponseText}
                  multiline
                />

                <Text style={styles.modalText}>Alert Status:</Text>
                <View style={styles.pickerContainer}>
                  <TouchableOpacity
                    style={styles.statusButton}
                    onPress={() => setAlertStatus('In Progress')}
                  >
                    <Text style={styles.statusButtonText}>In Progress</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.statusButton}
                    onPress={() => setAlertStatus('Resolved')}
                  >
                    <Text style={styles.statusButtonText}>Resolved</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmitResponse}
                >
                  <Text style={styles.submitButtonText}>Submit Response</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setShowModal(false)} // Close the modal
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    width: 250,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 4,
  },
  responseButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  responseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 300,
    marginTop: 16,
    borderRadius: 8,
  },
  map: {
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  metricCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  metricText: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default EmergencyAlerts;
