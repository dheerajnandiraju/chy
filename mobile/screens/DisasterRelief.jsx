import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { BarChart, XAxis, YAxis } from 'react-native-svg-charts'; // Import XAxis, YAxis for the tags on histogram

// Sample data for daily tracking of relief operations
const dailyReliefData = [
  { date: '2024-11-20', location: 'Location A', operations: 10 },
  { date: '2024-11-21', location: 'Location A', operations: 15 },
  { date: '2024-11-22', location: 'Location A', operations: 8 },
  { date: '2024-11-20', location: 'Location B', operations: 5 },
  { date: '2024-11-21', location: 'Location B', operations: 12 },
  { date: '2024-11-22', location: 'Location B', operations: 7 },
  // Add more data here...
];

// Sample disaster relief guidelines, emergency contacts, and technical support
const guidelines = [
  '1. Ensure the safety of yourself and others.',
  '2. Follow the evacuation routes provided by local authorities.',
  '3. Stay informed through official disaster relief channels.',
  '4. Follow instructions from relief teams on-site.',
];

const emergencyContacts = [
  { label: 'Emergency Contact 1', number: '+1234567890' },
  { label: 'Emergency Contact 2', number: '+0987654321' },
];

const technicalSupport = [
  { label: 'Support Team 1', contact: 'support1@relief.org' },
  { label: 'Support Team 2', contact: 'support2@relief.org' },
];

const DisasterRelief = () => {
  const [showModal, setShowModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  // Sample map markers showing locations of ongoing relief operations
  const ongoingOperations = [
    { id: 1, latitude: 37.78825, longitude: -122.4324, title: 'Location A' },
    { id: 2, latitude: 37.79025, longitude: -122.4354, title: 'Location B' },
  ];

  const openUrgentRequest = () => {
    // Open modal or navigate to a form screen for urgent requests
    console.log('Opening urgent request form...');
  };

  return (
    <ScrollView style={styles.container}>
      
      {/* Description at the Top */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Disaster Relief Efforts</Text>
        <Text style={styles.descriptionText}>
          Our disaster relief efforts are focused on providing aid to affected regions.
          Below you can track real-time relief operations, view impact metrics, and access emergency contacts.
        </Text>
      </View>

      {/* Send Urgent Request Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.urgentButton} onPress={openUrgentRequest}>
          <Text style={styles.buttonText}>Send Urgent Request</Text>
        </TouchableOpacity>
      </View>

      {/* Live Updates Map */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Live Updates</Text>
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
            {ongoingOperations.map((operation) => (
              <Marker
                key={operation.id}
                coordinate={{
                  latitude: operation.latitude,
                  longitude: operation.longitude,
                }}
                title={operation.title}
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* Impact Summary with Tags (Histogram) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Summary</Text>

        {/* Bar Chart Container (Wrap in Scrollable View) */}
        <View style={styles.barChartWrapper}>
          <ScrollView horizontal={true} style={styles.barChartContainer}>
            <View style={{ flexDirection: 'row', height: 200 }}>
              {/* Y Axis */}
              <YAxis
                data={dailyReliefData.map((item) => item.operations)}
                contentInset={{ top: 30, bottom: 30 }}
                svg={{
                  fontSize: 10,
                  fill: '#333',
                }}
                numberOfTicks={5}
                formatLabel={(value) => `${value}`}
              />
              
              {/* Bar Chart */}
              <BarChart
                style={styles.barChart}
                data={dailyReliefData.map((item) => item.operations)}
                svg={{ fill: '#E63946' }} // Change color for better visibility
                contentInset={{ top: 30, bottom: 30 }}
                animate={true}
              />
            </View>

            {/* X Axis */}
            <XAxis
              style={styles.xAxis}
              data={dailyReliefData}
              formatLabel={(value, index) => dailyReliefData[index].date}
              svg={{ fontSize: 10, fill: 'black' }}
            />
          </ScrollView>

          {/* Display value on top of each bar */}
          {dailyReliefData.map((item, index) => (
            <Text key={index} style={[styles.barLabel, { left: 10 + index * 60 }]}>{item.operations}</Text>
          ))}
        </View>
      </View>

      {/* Disaster Relief Guidelines */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disaster Relief Guidelines</Text>
        <TouchableOpacity style={styles.viewButton} onPress={() => setShowGuidelinesModal(true)}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{contact.label}: </Text>
            <Text style={styles.contactNumber}>{contact.number}</Text>
          </View>
        ))}
      </View>

      {/* Technical Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Support</Text>
        {technicalSupport.map((support, index) => (
          <View key={index} style={styles.contactItem}>
            <Text style={styles.contactLabel}>{support.label}: </Text>
            <Text style={styles.contactNumber}>{support.contact}</Text>
          </View>
        ))}
      </View>

      {/* Guidelines Modal */}
      <Modal visible={showGuidelinesModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Disaster Relief Guidelines</Text>
            <ScrollView style={styles.modalContent}>
              {guidelines.map((item, index) => (
                <Text key={index} style={styles.modalText}>{item}</Text>
              ))}
              <Text style={styles.modalSubTitle}>Emergency Contacts</Text>
              {emergencyContacts.map((contact, index) => (
                <Text key={index} style={styles.modalText}>{contact.label}: {contact.number}</Text>
              ))}
              <Text style={styles.modalSubTitle}>Technical Support</Text>
              {technicalSupport.map((support, index) => (
                <Text key={index} style={styles.modalText}>{support.label}: {support.contact}</Text>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowGuidelinesModal(false)} style={styles.modalCloseButton}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#555',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  urgentButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
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
  barChartWrapper: {
    marginTop: 16,
  },
  barChartContainer: {
    height: 200,
    marginTop: 16,
  },
  barChart: {
    flex: 1,
    borderRadius: 8,
  },
  xAxis: {
    marginTop: -10,
  },
  barLabel: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
  },
  viewButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalSubTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  modalContent: {
    maxHeight: 300,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  modalCloseButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default DisasterRelief;

// TODO: the bar chart is not displaying the data with bars. Fix the issue.