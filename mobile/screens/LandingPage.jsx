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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

// Updated color palette
const COLORS = {
  background: '#F9FAFB',  // Soft gray background
  primary: '#10B981',     // Vibrant green (aligned with previous components)
  secondary: '#34D399',   // Lighter green
  accent: '#F59E0B',      // Warm yellow
  text: '#1F2A44',        // Dark gray for text
  white: '#FFFFFF',
  lightGray: '#E5E7EB',
  darkOverlay: 'rgba(17, 24, 39, 0.7)',
  error: '#EF4444',
};

const LandingPage = () => {
  const navigation = useNavigation();
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    try {
      setLocalError('');
      
      // Basic validation
      if (!email || !password) {
        setLocalError('Please enter both email and password');
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setLocalError('Please enter a valid email address');
        return;
      }

      // Attempt login
      const user = await login(email, password);

      // Navigate based on user role
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
          setLocalError('Invalid user role');
      }
    } catch (error) {
      setLocalError(error.message || 'Login failed. Please try again.');
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
            
            {(error || localError) && (
              <Text style={styles.errorText}>{error || localError}</Text>
            )}

            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              editable={!loading}
            />
            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.featureScroll}
              contentContainerStyle={styles.featureScrollContent}
            >
              {[
                { title: 'Restaurants', image: require('../assets/1.png'), icon: 'cutlery' },
                { title: 'NGOs', image: require('../assets/3.png'), icon: 'building' },
                { title: 'Volunteers', image: require('../assets/4.png'), icon: 'heart' },
                { title: 'Organizations', image: require('../assets/5.png'), icon: 'users' },
              ].map((feature, index) => (
                <FeatureCard key={feature.title} title={feature.title} imageUrl={feature.image} icon={feature.icon} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Impact</Text>
            <View style={styles.metricsContainer}>
              {[
                { icon: 'coffee', label: 'Meals Donated', value: '500,000' },
                { icon: 'recycle', label: 'Food Saved', value: '12,000 kg' },
                { icon: 'users', label: 'Volunteers', value: '1,500' },
                { icon: 'home', label: 'NGOs', value: '200' },
              ].map((metric, index) => (
                <MetricCard key={metric.label} icon={metric.icon} label={metric.label} value={metric.value} />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leaderboard</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.leaderboardScroll}
              contentContainerStyle={styles.leaderboardScrollContent}
            >
              {[
                { title: 'Top Restaurants', content: 'Meals Donated', image: require('../assets/10.png') },
                { title: 'Top Volunteers', content: 'Hours Contributed', image: require('../assets/11.png') },
                { title: 'Top NGOs', content: 'Meals Distributed', image: require('../assets/12.png') },
              ].map((leader, index) => (
                <LeaderboardCard key={leader.title} title={leader.title} content={leader.content} imageUrl={leader.image} />
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Testimonials</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.testimonialsScroll}
              contentContainerStyle={styles.testimonialsScrollContent}
            >
              {[
                { content: 'John Doe', subContent: 'Restaurant Owner', image: require('../assets/13.png') },
                { content: 'Jane Smith', subContent: 'Volunteer', image: require('../assets/14.png') },
                { content: 'NGO Team', subContent: 'NGO Representative', image: require('../assets/15.png') },
              ].map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.content}
                  content={testimonial.content}
                  subContent={testimonial.subContent}
                  imageUrl={testimonial.image}
                />
              ))}
            </ScrollView>
          </View>

          <Text style={styles.footerText}>© 2025 Motiff AI. All rights reserved.</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const FeatureCard = ({ title, imageUrl, icon }) => (
  <TouchableOpacity style={styles.featureCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.featureImage} />
    <View style={styles.featureContent}>
      <Icon name={icon} size={24} color={COLORS.primary} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

const MetricCard = ({ icon, label, value }) => (
  <TouchableOpacity style={styles.metricCard} activeOpacity={0.8}>
    <Icon name={icon} size={28} color={COLORS.primary} style={styles.metricIcon} />
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </TouchableOpacity>
);

const LeaderboardCard = ({ title, content, imageUrl }) => (
  <TouchableOpacity style={styles.leaderboardCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.leaderboardImage} />
    <View style={styles.leaderboardContent}>
      <Text style={styles.leaderboardTitle}>{title}</Text>
      <Text style={styles.leaderboardText}>{content}</Text>
    </View>
  </TouchableOpacity>
);

const TestimonialCard = ({ content, subContent, imageUrl }) => (
  <TouchableOpacity style={styles.testimonialCard} activeOpacity={0.8}>
    <Image source={imageUrl} style={styles.testimonialImage} />
    <View style={styles.testimonialContent}>
      <Text style={styles.testimonialText}>{content}</Text>
      <Text style={styles.testimonialSubText}>{subContent}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    height: 420,
    width: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
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
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 20,
    color: COLORS.white,
    textAlign: 'center',
    fontWeight: '500',
  },
  loginSection: {
    padding: 24,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: width * 0.9,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    width: width * 0.9,
    padding: 16,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    padding: 24,
  },
  featureScroll: {
    marginTop: 12,
  },
  featureScrollContent: {
    paddingHorizontal: 12,
  },
  featureCard: {
    width: 200,
    height: 280,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  featureContent: {
    padding: 16,
    alignItems: 'center',
  },
  featureIcon: {
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  metricCard: {
    width: (width - 64) / 2,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricIcon: {
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: '600',
  },
  leaderboardScroll: {
    marginTop: 12,
  },
  leaderboardScrollContent: {
    paddingHorizontal: 12,
  },
  leaderboardCard: {
    width: 220,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  leaderboardContent: {
    padding: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  leaderboardText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  testimonialsScroll: {
    marginTop: 12,
  },
  testimonialsScrollContent: {
    paddingHorizontal: 12,
  },
  testimonialCard: {
    width: 220,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  testimonialImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
  },
  testimonialContent: {
    padding: 16,
  },
  testimonialText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  testimonialSubText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  footerText: {
    textAlign: 'center',
    color: COLORS.text,
    padding: 24,
    fontSize: 14,
    fontWeight: '500',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
});

export default LandingPage;