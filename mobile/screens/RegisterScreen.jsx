import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

// Color palette
const COLORS = {
  primary: '#1A365D',    // Deep blue
  secondary: '#4A5568',  // Warm gray
  accent: '#ED8936',     // Vibrant orange
  white: '#FFFFFF',
  lightGray: '#F7FAFC',
  error: '#E53E3E',
  success: '#38A169',
};

const roles = [
  {
    id: 'restaurants',
    title: 'Restaurants',
    icon: 'restaurant',
    description: 'Donate excess food and reduce waste',
    color: COLORS.primary,
  },
  {
    id: 'ngos',
    title: 'NGOs',
    icon: 'people',
    description: 'Receive and distribute food to those in need',
    color: COLORS.secondary,
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    icon: 'heart',
    description: 'Help in food collection and distribution',
    color: COLORS.accent,
  },
  {
    id: 'organizations',
    title: 'Old Age/Orphanage Homes',
    icon: 'home',
    description: 'Receive food donations for your residents',
    color: COLORS.primary,
  },
  {
    id: 'farmers',
    title: 'Farmers',
    icon: 'leaf',
    description: 'Donate surplus produce to those in need',
    color: COLORS.secondary,
  },
];

const RegisterScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRoleSelect = (role) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.navigate(selectedRole.id);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Alert.alert('Please select a role');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary]}
        style={styles.background}
      />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <View style={styles.header}>
          <Ionicons name="person-add" size={40} color={COLORS.white} />
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>Select the role that best describes you</Text>
        </View>

        <ScrollView 
          style={styles.rolesContainer}
          showsVerticalScrollIndicator={false}
        >
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selectedRole?.id === role.id && styles.selectedRoleCard,
                { borderColor: role.color }
              ]}
              onPress={() => handleRoleSelect(role)}
            >
              <View style={[styles.roleIconContainer, { backgroundColor: role.color }]}>
                <Ionicons name={role.icon} size={24} color={COLORS.white} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>{role.title}</Text>
                <Text style={styles.roleDescription}>{role.description}</Text>
              </View>
              {selectedRole?.id === role.id && (
                <View style={[styles.checkmarkContainer, { backgroundColor: role.color }]}>
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedRole}
        >
          <LinearGradient
            colors={selectedRole ? [COLORS.accent, COLORS.primary] : [COLORS.secondary, COLORS.secondary]}
            style={styles.continueButtonGradient}
          >
            <Text style={styles.continueButtonText}>
              Continue as {selectedRole?.title || 'Select Role'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
    marginTop: 15,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.8,
    textAlign: 'center',
  },
  rolesContainer: {
    flex: 1,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedRoleCard: {
    borderWidth: 2,
    transform: [{ scale: 1.02 }],
  },
  roleIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 5,
  },
  roleDescription: {
    fontSize: 14,
    color: COLORS.secondary,
  },
  checkmarkContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    height: 50,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.7,
  },
  continueButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default RegisterScreen;
