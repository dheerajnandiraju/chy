import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const COLORS = {
  background: '#F9FAFB',
  primary: '#10B981',
  text: '#1F2A44',
  white: '#FFFFFF',
  darkOverlay: 'rgba(17, 24, 39, 0.7)',
};

const LandingPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockUsers = [
    { email: 'resto@gmail.com', password: 'resto123', role: 'Restaurant' },
    { email: 'volunteerking@gmail.com', password: 'volunteer123', role: 'Volunteer' },
    { email: 'ngo2@gmail.com', password: 'ngo123', role: 'NGO' },
    { email: 'farmer@gmail.com', password: 'farmer123', role: 'Farmer' },
  ];

  const handleLogin = () => {
    const user = mockUsers.find(
      u =>
        u.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        u.password === password
    );

    if (!user) {
      alert('Login Failed: Invalid email or password!');
      return;
    }

    switch (user.role) {
      case 'Restaurant':
        navigation.navigate('HomePage');
        break;
      case 'Volunteer':
        navigation.navigate('VolunteerDashboard');
        break;
      case 'NGO':
        navigation.navigate('Oldage');
        break;
      case 'Farmer':
        navigation.navigate('FarmersDashboard');
        break;
      default:
        alert('Error: Role not mapped!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.heroSection}>
            <ImageBackground
              source={require('../assets/0.png')}
              style={styles.imageBackground}
              imageStyle={styles.image}
            >
              <LinearGradient
                colors={[COLORS.darkOverlay, COLORS.darkOverlay]}
                style={styles.overlay}
              >
                <Image style={styles.logo} source={require('../assets/wText.png')} />
                <Text style={styles.heroTitle}>Bridging Communities</Text>
                <Text style={styles.heroSubtitle}>Empowering Food Rescue</Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={styles.loginSection}>
            <Text style={styles.sectionTitle}>Login to Continue</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.impactSection}>
            <Text style={styles.sectionTitle}>Our Impact</Text>
            <View style={styles.metricsContainer}>
              <MetricCard icon="coffee" label="Meals Donated" value="500,000" />
              <MetricCard icon="recycle" label="Food Saved" value="12,000 kg" />
              <MetricCard icon="users" label="Volunteers" value="1,500" />
              <MetricCard icon="home" label="NGOs" value="200" />
            </View>
          </View>

          <View style={styles.testimonialSection}>
            <Text style={styles.sectionTitle}>Testimonials</Text>
            {testimonials.map((item, index) => (
              <View key={index} style={styles.testimonialCard}>
                <View style={styles.testimonialHeader}>
                  <Image source={{ uri: item.image }} style={styles.avatar} />
                  <View>
                    <Text style={styles.testimonialName}>{item.name}</Text>
                    <Text style={styles.testimonialRole}>{item.role}</Text>
                  </View>
                </View>
                <Text style={styles.testimonialText}>"{item.feedback}"</Text>
              </View>
            ))}
          </View>

          <Text style={styles.footerText}>© 2025 . All rights reserved.</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const MetricCard = ({ icon, label, value }) => (
  <View style={styles.metricCard}>
    <Icon name={icon} size={24} color={COLORS.primary} />
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

const testimonials = [
  {
    name: 'Ramesh Kumar',
    role: 'Restaurant Owner',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
    feedback: 'This platform made it easy for us to donate excess food daily. Amazing experience!',
  },
  {
    name: 'Aarushi Mehta',
    role: 'Volunteer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'Helping out with deliveries is so fulfilling. Love the organized process!',
  },
  {
    name: 'Father Thomas',
    role: 'NGO Head',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    feedback: 'The food quality and consistency are commendable. A real blessing for our center.',
  },
];

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    height: 400,
  },
  imageBackground: {
    flex: 1,
  },
  image: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: COLORS.white,
    textAlign: 'center',
  },
  loginSection: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 14,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    marginBottom: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
  impactSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  metricCard: {
    width: (width - 72) / 2,
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginTop: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 4,
  },
  testimonialSection: {
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  testimonialCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  testimonialName: {
    fontWeight: '700',
    fontSize: 16,
    color: COLORS.text,
  },
  testimonialRole: {
    fontSize: 13,
    color: '#6B7280',
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.text,
    fontStyle: 'italic',
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.text,
    fontSize: 14,
    marginTop: 20,
  },
});

export default LandingPage;
