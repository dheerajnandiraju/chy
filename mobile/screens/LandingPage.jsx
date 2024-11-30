import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome icons (or any other icon set)
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      {/* Image Background Section with Overlay Text */}
      <ImageBackground 
        source={require('../assets/0.png')}  // Placeholder for background image
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.subtitle}>Bridging Communities</Text>
          <Text style={styles.mutedText}>The future of food rescue!</Text>
        </View>
      </ImageBackground>

      {/* How It Works Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.grid}>
          <Card title="Restaurants" imageUrl={require('../assets/1.png')} />
          <Card title="NGOs" imageUrl={require('../assets/3.png')} />
          <Card title="Volunteers" imageUrl={require('../assets/4.png')} />
          <Card title="Organizations" imageUrl={require('../assets/5.png')} />
        </View>
      </View>

      {/* Feature Highlights Section (using Horizontal ScrollView) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feature Highlights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featureScroll}>
          <Card title="Real-Time Food Tracking" imageUrl={require('../assets/6.png')} />
          <Card title="Disaster Relief Mode" imageUrl={require('../assets/7.png')} />
          <Card title="Community Food Fridges" imageUrl={require('../assets/8.png')} />
          <Card title="Language Assistance" imageUrl={require('../assets/9.png')} />
        </ScrollView>
      </View>

      {/* Impact Metrics Section as Carousel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <MetricCard icon="coffee" label="Meals" value="500,000" />
          <MetricCard icon="recycle" label="Saved" value="12,000 kg" />
          <MetricCard icon="users" label="Volunteers" value="1,500" />
          <MetricCard icon="home" label="NGOs" value="200" />
        </ScrollView>
      </View>

      {/* Leaderboard Section (Horizontal ScrollView) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <Card title="Top Restaurants" content="Based on Meals Donated" imageUrl={require('../assets/10.png')} />
          <Card title="Top Volunteers" content="Based on Hours Contributed" imageUrl={require('../assets/11.png')} />
          <Card title="Top NGOs" content="Based on Meals Distributed" imageUrl={require('../assets/12.png')} />
        </ScrollView>
      </View>

      {/* Testimonials Section (Horizontal ScrollView) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <Card content="John Doe" subContent="Restaurant Owner" imageUrl={require('../assets/13.png')} />
          <Card content="Jane Smith" subContent="Volunteer" imageUrl={require('../assets/14.png')} />
          <Card content="NGO Team" subContent="NGO Representative" imageUrl={require('../assets/15.png')} />
        </ScrollView>
      </View>

      {/* Call to Action Section */}
      <View style={styles.buttonSection}>
        <Text style={styles.sectionTitle}>Be A Part of the Change</Text>
        <View style={styles.buttonContainer}>
          {/* Sign Up Button */}
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Donate Now Button */}
          <TouchableOpacity 
            style={[styles.button, styles.donateButton]}
            onPress={() => alert('Donate Now pressed')}
          >
            <Text style={styles.buttonText}>Donate Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2023 Motiff AI. All rights reserved.</Text>
    </ScrollView>
  );
};

// MetricCard Component with Circular Icon and Label
const MetricCard = ({ icon, label, value }) => {
  return (
    <View style={styles.metricCard}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={40} color="black" style={styles.icon} />
      </View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
};

// Card Component
const Card = ({ title, content, subContent, imageUrl }) => {
  return (
    <View style={styles.card}>
      {/* Image */}
      {imageUrl && <Image source={imageUrl} style={styles.cardImage} />}
      
      {title && <Text style={styles.cardTitle}>{title}</Text>}
      {content && <Text style={styles.cardContent}>{content}</Text>}
      {subContent && <Text style={styles.cardSubContent}>{subContent}</Text>}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:'10',
    backgroundColor: '#f9f9f9',
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  image: {
    borderRadius: 8,
  },
  overlay: {
    alignItems: 'left',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay to improve text visibility
    width: '100%',
    height: '100%',
    padding: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
  },
  mutedText: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 5,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureScroll: {
    marginTop: 10,
    paddingVertical: 10,
  },
  metricsScroll: {
    marginTop: 10,
    paddingVertical: 10,
  },
  card: {
    padding: 1,
    borderRadius: 8,
    width: 150,  // Keep the width smaller for non-carousel cards like in How It Works
    marginBottom: 20,
    marginRight: 10,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#555',
  },
  cardSubContent: {
    fontSize: 12,
    color: '#777',
  },
  buttonSection: {
    marginTop: 20,
    alignItems: 'center', // Center align the buttons
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%', // Full width for buttons
  },
  button: {
    backgroundColor: '#00dcf6', // Blue color for the Sign Up button
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,  // Rounded corners
    marginBottom: 10,
    alignItems: 'center', // Center text inside button
    justifyContent: 'center',
    width:'90%' // For Android shadow
  },
  donateButton: {
    backgroundColor: '#dbe2e3', // Green color for Donate Now button
    borderRadius: 10, // Keep border radius the same for a unified look
    width: '90%', // Make the button slightly smaller
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#aaa',
    marginTop: 40,
  },

  // Styles for the Impact Metrics section with Circular Icons
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  metricCard: {
    alignItems: 'center',
    width: 170,  // Set width to 180 for consistency across carousel cards only
    height:'5vh',
    marginRight: 20,  // Space between cards
    padding: 20,
    backgroundColor: '#fff',  // White background for each card
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: 'white', // Blue color for circle background
    borderRadius: 50,
    padding: 15,
    marginBottom: 10,
  },
  icon: {
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
});

export default LandingPage;
