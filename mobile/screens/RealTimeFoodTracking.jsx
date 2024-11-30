import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Placeholder image for volunteers
const volunteerPlaceholderImage = 'https://via.placeholder.com/50'; // This will always load

// Sample journey donations data
const journeyDonations = [
  {
    id: 1,
    volunteer: { name: 'John Doe', image: 'https://via.placeholder.com/50', contact: '+1234567890' },
    deliveryDetails: 'Delivery to the community center at 5th Ave. The delivery will take a few minutes to reach.',
    location: { latitude: 37.78825, longitude: -122.4324 },
  },
  {
    id: 2,
    volunteer: { name: 'Jane Smith', image: 'https://via.placeholder.com/50', contact: '+1987654321' },
    deliveryDetails: 'Delivery to the food bank at Elm St. Delivery is expected within 20 minutes.',
    location: { latitude: 37.79025, longitude: -122.4344 },
  },
];

const RealTimeFoodTracking = () => {
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Impact metrics data
  const impactMetrics = {
    totalAlerts: 150,
    avgTime: '15 min',
    beneficiaryCount: 120,
    avgMealsDelivered: 500,
  };

  // Function to open modal and set the selected journey
  const openTrackModal = (journey) => {
    setSelectedJourney(journey);
    setShowModal(true);
  };

  // Function to close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedJourney(null);
  };

  // Check if the image exists; if not, use the placeholder
  const getImageSource = (imageUrl) => {
    return imageUrl ? { uri: imageUrl } : { uri: volunteerPlaceholderImage };
  };

  return (
    <ScrollView style={styles.container}>
      {/* Journey Donations List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Journey Donations</Text>
        {journeyDonations.map((journey) => (
          <View key={journey.id} style={styles.journeyItem}>
            <Text style={styles.journeyTitle}>Journey Donation #{journey.id}</Text>
            <View style={styles.volunteerInfo}>
              <Image source={getImageSource(journey.volunteer.image)} style={styles.volunteerImage} />
              <View>
                <Text style={styles.volunteerName}>{journey.volunteer.name}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={() => openTrackModal(journey)}
            >
              <Text style={styles.buttonText}>Track</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Impact Metrics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <View style={styles.impactMetricsContainer}>
          <Text>Total Alerts: {impactMetrics.totalAlerts}</Text>
          <Text>Average Time: {impactMetrics.avgTime}</Text>
          <Text>Beneficiary Count: {impactMetrics.beneficiaryCount}</Text>
          <Text>Avg Meals Delivered: {impactMetrics.avgMealsDelivered}</Text>
        </View>
      </View>

      {/* Modal to Display Map, Contact Info, and Delivery Details */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Track Your Donation</Text>
            {selectedJourney && (
              <>
                {/* ScrollView for Modal Content */}
                <ScrollView contentContainerStyle={styles.modalScrollView}>
                  {/* Map */}
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: selectedJourney.location.latitude,
                      longitude: selectedJourney.location.longitude,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    <Marker
                      coordinate={selectedJourney.location}
                      title="Volunteer Location"
                      description="Volunteer is here!"
                    />
                  </MapView>

                  {/* Volunteer Info */}
                  <View style={styles.volunteerInfo}>
                    <Image
                      source={getImageSource(selectedJourney.volunteer.image)}
                      style={styles.volunteerImage}
                    />
                    <View>
                      <Text style={styles.volunteerName}>{selectedJourney.volunteer.name}</Text>
                      <Text style={styles.volunteerContact}>
                        Contact: {selectedJourney.volunteer.contact}
                      </Text>
                      <Text style={styles.deliveryDetails}>
                        Delivery Details: {selectedJourney.deliveryDetails}
                      </Text>
                    </View>
                  </View>
                </ScrollView>

                {/* Close Button */}
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  journeyItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  journeyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  volunteerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  volunteerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  volunteerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  impactMetricsContainer: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    maxHeight: '80%', // Ensure modal content doesn't overflow the screen
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalScrollView: {
    paddingBottom: 20, // Space at the bottom to prevent cut-off
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  volunteerContact: {
    fontSize: 14,
    marginVertical: 4,
  },
  deliveryDetails: {
    fontSize: 14,
    marginVertical: 4,
  },
  closeButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default RealTimeFoodTracking;
