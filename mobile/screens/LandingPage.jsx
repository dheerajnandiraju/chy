import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Logo and Role Selection Section */}
      <View style={styles.buttonSection}>
        <Image style={styles.logo} source={require('../assets/wText.png')} />
        <Text style={styles.sectionTitle}>Choose Your Role to Continue</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HomePage')}
          >
            <Text style={styles.buttonText}>I am a Restaurant</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('VolunteerDashboard')}
          >
            <Text style={styles.buttonText}>I am a Volunteer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Oldage')}
          >
            <Text style={styles.buttonText}>I am an NGO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('FarmersDashboard')}
          >
            <Text style={styles.buttonText}>I am a Farmer</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.donateButton]}
          onPress={() => alert('Donate Now pressed')}
        >
          <Text style={styles.buttonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>

      {/* Background Image with Overlay */}
      <ImageBackground
        source={require('../assets/0.png')}
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

      {/* Feature Highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feature Highlights</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featureScroll}>
          <Card title="Real-Time Food Tracking" imageUrl={require('../assets/6.png')} />
          <Card title="Disaster Relief Mode" imageUrl={require('../assets/7.png')} />
          <Card title="Community Food Fridges" imageUrl={require('../assets/8.png')} />
          <Card title="Language Assistance" imageUrl={require('../assets/9.png')} />
        </ScrollView>
      </View>

      {/* Impact Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <MetricCard icon="coffee" label="Meals" value="500,000" />
          <MetricCard icon="recycle" label="Saved" value="12,000 kg" />
          <MetricCard icon="users" label="Volunteers" value="1,500" />
          <MetricCard icon="home" label="NGOs" value="200" />
        </ScrollView>
      </View>

      {/* Leaderboard */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <Card title="Top Restaurants" content="Based on Meals Donated" imageUrl={require('../assets/10.png')} />
          <Card title="Top Volunteers" content="Based on Hours Contributed" imageUrl={require('../assets/11.png')} />
          <Card title="Top NGOs" content="Based on Meals Distributed" imageUrl={require('../assets/12.png')} />
        </ScrollView>
      </View>

      {/* Testimonials */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testimonials</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.metricsScroll}>
          <Card content="John Doe" subContent="Restaurant Owner" imageUrl={require('../assets/13.png')} />
          <Card content="Jane Smith" subContent="Volunteer" imageUrl={require('../assets/14.png')} />
          <Card content="NGO Team" subContent="NGO Representative" imageUrl={require('../assets/15.png')} />
        </ScrollView>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>© 2023 Motiff AI. All rights reserved.</Text>
    </ScrollView>
  );
};

// Metric Card Component
const MetricCard = ({ icon, label, value }) => (
  <View style={styles.metricCard}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={40} color="black" style={styles.icon} />
    </View>
    <Text style={styles.metricLabel}>{label}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

// Card Component
const Card = ({ title, content, subContent, imageUrl }) => (
  <View style={styles.card}>
    {imageUrl && <Image source={imageUrl} style={styles.cardImage} />}
    {title && <Text style={styles.cardTitle}>{title}</Text>}
    {content && <Text style={styles.cardContent}>{content}</Text>}
    {subContent && <Text style={styles.cardSubContent}>{subContent}</Text>}
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
  },
  mutedText: {
    fontSize: 16,
    color: '#ccc',
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
    width: 150,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#00dcf6',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  donateButton: {
    backgroundColor: '#dbe2e3',
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
  metricCard: {
    alignItems: 'center',
    width: 170,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
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
  logo: {
    height: 200,
    width: 200,
    margin: 30,
  },
});

export default LandingPage;
