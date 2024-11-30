import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { PieChart } from 'react-native-svg-charts'; // Pie chart library
import { Text as SvgText } from 'react-native-svg'; // For rendering text inside the pie chart

// Sample Data for Pie Chart
const pieData = [
  { key: 1, value: 40, svg: { fill: '#f00' }, arc: { outerRadius: '100%', innerRadius: '80%' } }, // Farmer
  { key: 2, value: 30, svg: { fill: '#0f0' }, arc: { outerRadius: '100%', innerRadius: '80%' } }, // Restaurant
  { key: 3, value: 20, svg: { fill: '#00f' }, arc: { outerRadius: '100%', innerRadius: '80%' } }, // NGO
  { key: 4, value: 10, svg: { fill: '#ff0' }, arc: { outerRadius: '100%', innerRadius: '80%' } }, // Volunteer
];

// Placeholder Data for Top Contributors
const topContributors = {
  restaurants: [
    { id: 1, name: 'Restaurant 1', imgUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Restaurant 2', imgUrl: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Restaurant 3', imgUrl: 'https://via.placeholder.com/50' },
  ],
  volunteers: [
    { id: 1, name: 'Volunteer 1', imgUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Volunteer 2', imgUrl: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Volunteer 3', imgUrl: 'https://via.placeholder.com/50' },
  ],
  ngos: [
    { id: 1, name: 'NGO 1', imgUrl: 'https://via.placeholder.com/50' },
    { id: 2, name: 'NGO 2', imgUrl: 'https://via.placeholder.com/50' },
    { id: 3, name: 'NGO 3', imgUrl: 'https://via.placeholder.com/50' },
  ],
};

const CommunityImpact = () => {
  const [showMoreRestaurants, setShowMoreRestaurants] = useState(false);
  const [showMoreVolunteers, setShowMoreVolunteers] = useState(false);
  const [showMoreNGOs, setShowMoreNGOs] = useState(false);

  // Beneficiaries data for the map
  const beneficiaries = [
    { latitude: 37.78825, longitude: -122.4324, name: 'Beneficiary 1' },
    { latitude: 37.78945, longitude: -122.4354, name: 'Beneficiary 2' },
    { latitude: 37.79125, longitude: -122.4384, name: 'Beneficiary 3' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Tracking Our Journey Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tracking Our Journey</Text>
        <View style={styles.imagePlaceholder} />
      </View>

      {/* Graph Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Food Saved Breakdown</Text>
        <PieChart
          style={styles.pieChart}
          data={pieData}
          innerRadius="50%"
          outerRadius="100%"
          paddingAngle={0}
          animate
          labelRadius={50} // Label radius to adjust position of text
        >
          {pieData.map((slice, index) => {
            const { value, svg, key } = slice;
            const angle = (value / 100) * 360; // Calculate the angle of each slice
            const startAngle = index === 0 ? 0 : pieData.slice(0, index).reduce((acc, slice) => acc + (slice.value / 100) * 360, 0);
            const endAngle = startAngle + angle;
            const labelAngle = (startAngle + endAngle) / 2; // Mid-point angle of the slice

            // Calculate label position based on slice angle
            const x = 50 + Math.cos(Math.PI * (labelAngle / 180)) * 50; // X position (on the radius)
            const y = 50 + Math.sin(Math.PI * (labelAngle / 180)) * 50; // Y position (on the radius)

            return (
              <SvgText
                key={key}
                x={x}
                y={y}
                fontSize={16} // Adjust font size
                fontWeight="bold"
                fill="#333" // Use dark color for text visibility
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {`${value}%`}
              </SvgText>
            );
          })}
        </PieChart>
      </View>

      {/* Total Volunteers Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Total Volunteers</Text>
        <View style={styles.imagePlaceholder} />
      </View>

      {/* Top Contributors Sections */}
      {['restaurants', 'volunteers', 'ngos'].map((type) => (
        <View style={styles.section} key={type}>
          <Text style={styles.sectionTitle}>Top {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {(showMoreRestaurants
              ? topContributors[type]
              : topContributors[type].slice(0, 3)
            ).map((item) => (
              <View key={item.id} style={styles.card}>
                <Image source={{ uri: item.imgUrl }} style={styles.image} />
                <Text>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              type === 'restaurants'
                ? setShowMoreRestaurants(!showMoreRestaurants)
                : type === 'volunteers'
                ? setShowMoreVolunteers(!showMoreVolunteers)
                : setShowMoreNGOs(!showMoreNGOs);
            }}
            style={styles.showMoreButton}
          >
            <Text style={styles.showMoreText}>Show More</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Beneficiaries Reached Section (Map) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficiaries Reached</Text>
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
            {beneficiaries.map((beneficiary, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: beneficiary.latitude,
                  longitude: beneficiary.longitude,
                }}
                title={beneficiary.name}
              />
            ))}
          </MapView>
        </View>
      </View>

      {/* Environmental Impact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environmental Impact</Text>
        <View style={styles.imagePlaceholder} />
      </View>
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
  imagePlaceholder: {
    backgroundColor: '#ddd',
    height: 200,
    borderRadius: 8,
  },
  pieChart: {
    height: 200,
    borderRadius: 8,
  },
  card: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  showMoreButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  showMoreText: {
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
});

export default CommunityImpact;
