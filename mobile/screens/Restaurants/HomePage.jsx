import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import Layout from './Layout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8F9',
  },
  heroSection: {
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  heroText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Poppins-Bold',
  },
  callToActionButton: {
    backgroundColor: '#17C6ED',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  callToActionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  impactSection: {
    padding: 25,
    backgroundColor: '#fff',
    marginTop: -10,
    marginBottom: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  impactTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  impactText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
    lineHeight: 22,
  },
  testimonialSection: {
    paddingHorizontal: 25,
    paddingBottom: 50,
    marginTop: 10,
    backgroundColor: '#F6F8F9',
  },
  testimonialText: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  testimonialAuthor: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#17C6ED',
  },
});

const HomePage = () => {
  const navigation = useNavigation();

  const handleDonationPress = () => {
    // Navigate to the donation page or more information
    navigation.navigate('RestaurantsDashboard'); // Replace with actual navigation
  };

  return (
    <Layout navigation={navigation}>
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ImageBackground
        source={require("../../assets/106.png")} // Replace with the image you will use
        style={styles.heroSection}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <Text style={styles.heroText}>
          Make a Difference: Donate Food, Change Lives
        </Text>
        <TouchableOpacity
          style={styles.callToActionButton}
          onPress={handleDonationPress}
        >
          <Text style={styles.callToActionButtonText}>
            Join the Movement
          </Text>
        </TouchableOpacity>
      </ImageBackground>

      {/* Impact Section */}
      <View style={styles.impactSection}>
        <Text style={styles.impactTitle}>Impact So Far</Text>
        <Text style={styles.impactText}>
          Over 500,000 meals donated, and counting! Together, we are feeding
          those in need and making a real difference in the lives of thousands
          of people.
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5 name="hand-holding-heart" size={24} color="#17C6ED" />
          <Text style={{ fontSize: 18, marginLeft: 8, fontWeight: 'bold' }}>
            Join 1000+ Restaurants Making an Impact
          </Text>
        </View>
      </View>

      {/* Testimonial Section */}
      <View style={styles.testimonialSection}>
        <Text style={styles.testimonialText}>
          "By donating our unsold meals, we have not only reduced food waste,
          but also brought smiles to countless people in need. It’s been one of
          the most fulfilling things we’ve done as a restaurant!"
        </Text>
        <Text style={styles.testimonialAuthor}>– John, Owner of The Green Bistro</Text>
      </View>
    </ScrollView>
    </Layout>
  );
};

export default HomePage;
