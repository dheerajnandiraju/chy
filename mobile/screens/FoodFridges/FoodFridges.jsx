"use client"; 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Used for drop-downs
import MapView, { Marker } from 'react-native-maps';  // Import MapView and Marker from react-native-maps

// Sample data for fridges
const fridgeLocations = [
  { id: 1, name: 'Fridge 1', latitude: 37.78825, longitude: -122.4324 },
  { id: 2, name: 'Fridge 2', latitude: 37.78845, longitude: -122.4344 },
  { id: 3, name: 'Fridge 3', latitude: 37.78925, longitude: -122.4354 },
];

const FoodFridges = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [serveFor, setServeFor] = useState('');
  const [expireTime, setExpireTime] = useState('');

  // Stats data for the top cards
  const stats = [
    { label: 'Total Fridges', value: '50' },
    { label: 'Meals Donated', value: '1,200' },
    { label: 'Fridges Near You', value: '10' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Food Fridges</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsCard}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.cardText}>{stat.value}</Text>
            <Text style={styles.cardLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Find a Fridge Section */}
      <Text style={styles.sectionTitle}>Find a Fridge</Text>

      {/* Map Section with react-native-maps */}
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
          {/* Markers for fridges */}
          {fridgeLocations.map((fridge) => (
            <Marker
              key={fridge.id}
              coordinate={{ latitude: fridge.latitude, longitude: fridge.longitude }}
              title={fridge.name}
              description={`Location of ${fridge.name}`}
            />
          ))}
        </MapView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search fridges near you..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Donate Food Section */}
      <Text style={styles.sectionTitle}>Donate Food</Text>
      <View style={styles.donateSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter meal details (e.g., Pizza, Salad)"
        />

        {/* Serve For Picker */}
        <Text style={styles.pickerLabel}>Serve For</Text>
        <Picker
          selectedValue={serveFor}
          style={styles.picker}
          onValueChange={(itemValue) => setServeFor(itemValue)}
        >
          <Picker.Item label="Select..." value="" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
        </Picker>

        {/* Expire Time */}
        <Text style={styles.pickerLabel}>Expire Time</Text>
        <View style={styles.expireTimeContainer}>
          <TouchableOpacity
            style={[styles.donateButton, expireTime === 'days' && { backgroundColor: '#3B82F6' }]}
            onPress={() => setExpireTime('days')}
          >
            <Text style={styles.donateButtonText}>Days</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.donateButton, expireTime === 'hrs' && { backgroundColor: '#3B82F6' }]}
            onPress={() => setExpireTime('hrs')}
          >
            <Text style={styles.donateButtonText}>Hours</Text>
          </TouchableOpacity>
        </View>

        {/* Donate Button */}
        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateButtonText}>Donate Meal</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Define some styles for the layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F3F4F6',  // Background color
    marginTop:20,
  },
  header: {
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#E5E7EB', // Tailwind 'bg-gray-200'
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
  },
  mapContainer: {
    height: 300,
    marginTop: 16,
    borderRadius: 8,
  },
  map: {
    flex: 1,
    borderRadius: 8,
  },
  searchContainer: {
    marginTop: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 10,
    marginBottom: 16,
  },
  searchInput: {
    fontSize: 16,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius:3,

  },
  donateSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  donateButton: {
    backgroundColor: '#3B82F6', // Tailwind 'bg-blue-500'
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  donateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerLabel: {
    marginTop: 16,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderColor: '#E5E7EB',
    borderWidth: 1,
  },
  expireTimeContainer: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-between',
  },
});

export default FoodFridges;
