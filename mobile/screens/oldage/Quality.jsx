import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const COLORS = {
  background: '#F9FAFB',
  primary: '#10B981',
  secondary: '#6EE7B7',
  accent: '#F59E0B',
  textPrimary: '#1F2937',
  textSecondary: '#6B7280',
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  error: '#EF4444',
  success: '#10B981',
  darkOverlay: 'rgba(17, 24, 39, 0.6)',
};

const Quality = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Food Quality');
  const [comments, setComments] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const options = ['Food Quality', 'Quantity', 'Packaging', 'Other Issues'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  const launchImagePickerHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // 💡 Submit feedback to backend
  const handleSubmitFeedback = async () => {
    if (!comments.trim()) {
      Alert.alert('Error', 'Please add comments before submitting.');
      return;
    }

    const formData = new FormData();
formData.append('issueType', selectedOption);
formData.append('comments', comments);
formData.append('image', {
  uri: selectedImage,
  name: 'feedback.jpg',
  type: 'image/jpeg',
});

try {
  const response = await fetch('http://192.168.205.2:5000/api/feedbacks/quality-check', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  const data = await response.json();

  if (response.ok) {
    Alert.alert('Success', `Feedback submitted!\n\nAI Response:\n${data.feedbackText}`);
    setComments('');
    setSelectedImage(null);
  } else {
    Alert.alert('Error', data.error || 'Submission failed');
  }
} catch (error) {
  console.error('❌ Submission error:', error);
  Alert.alert('Error', 'Network request failed. Please check server or IP address.');
}
};

  useEffect(() => {
    requestImagePermissions();
  }, []);

  return (
    <ScrollView style={styles.screen} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="restaurant" size={24} color={COLORS.textPrimary} />
        <Text style={styles.title}>Food Quality Verification</Text>
      </View>

      <Text style={styles.description}>
    Your feedback helps improve food redistribution. Share your thoughts below!
  </Text>

  <Text style={styles.sectionTitle}>Feedback Form</Text>

  <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
    <Text style={styles.dropdownText}>{selectedOption}</Text>
    <Icon name="chevron-down" size={18} color={COLORS.textPrimary} />
  </TouchableOpacity>

  {isOpen &&
    options.map((option) => (
      <TouchableOpacity
        key={option}
        style={styles.dropdownOption}
        onPress={() => handleOptionSelect(option)}
      >
        <Text style={styles.dropdownOptionText}>{option}</Text>
      </TouchableOpacity>
    ))}

  <TextInput
    style={styles.commentInput}
    placeholder="Enter your comments"
    placeholderTextColor={COLORS.textSecondary}
    multiline
    value={comments}
    onChangeText={setComments}
  />

  <TouchableOpacity onPress={launchImagePickerHandler} style={styles.uploadButton}>
    {selectedImage ? (
      <Image source={{ uri: selectedImage }} style={styles.uploadImage} />
    ) : (
      <Text style={styles.uploadText}>Upload Image</Text>
    )}
  </TouchableOpacity>

  <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitFeedback}>
    <Text style={styles.buttonText}>Submit Feedback</Text>
  </TouchableOpacity>
</ScrollView>

      
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  container: {
    marginBottom: 16,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    marginBottom: 12,
  },
  reportButton: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
  dropdownButton: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    elevation: 4,
  },
  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dropdownOptions: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.textSecondary,
  },
  dropdownOptionText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  commentInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: COLORS.textPrimary,
    elevation: 4,
  },
  upload: {
    marginBottom: 20,
    alignItems: 'center',
  },
  uploadImageContainer: {
    width: 300,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    width: 300,
    height: 100,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 4,
  },
  uploadText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardImage: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});

export default Quality;