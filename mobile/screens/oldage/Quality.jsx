import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';


const Quality = () => {
  const styles = StyleSheet.create({
    screen: {
      paddingTop: 50,
      paddingLeft: 20,
      marginBottom: 30,
    },
    title: {
      marginTop: 10,
      fontSize: 30,
      fontWeight: '800',
    },
    des: {
      lineHeight: 20,
      marginTop: 10,
      fontSize: 15,
      fontWeight: '500',
    },
    sub: {
      marginTop: 30,
      fontSize: 25,
      fontWeight: '800',
    },
    container: {
      padding: 16,
    },
    confirmButton: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 10,
    },
    reportButton: {
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#f0f0f0',
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
    },
    buttonText2: {
      color: '#000',
      textAlign: 'center',
      fontSize: 16,
    },
    dropdownButton: {
      borderColor: 'black',
      borderWidth: 1,
      backgroundColor: '#f0f0f0', // Light gray background
      paddingHorizontal: 16, // Horizontal padding
      paddingVertical: 12, // Vertical padding
      borderRadius: 8, // Rounded corners
      flexDirection: 'row', // Arrange elements horizontally
      alignItems: 'center', // Align elements vertically in center
    },
    dropdownText: {
      fontSize: 16, // Text size
      color: '#333', // Text color
      flex: 1, // Take up remaining space in the row
    },
    dropdownArrow: {
      fontSize: 18, // Arrow size
      color: '#333', // Arrow color
    },
    dropdownOptions: {
      zIndex: 10,
      backgroundColor: '#fff', // White background for options
      position: 'absolute', // Position the options menu below the button
      top: 50, // Adjust the top position from the button
      left: 15, // Align options menu to the left
      width: '100%', // Make the options menu full width
      borderRadius: 8, // Rounded corners for the options menu
      shadowColor: '#000', // Shadow for a more defined look
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4, // Adjust shadow blur
    },
    dropdownOption: {
      paddingHorizontal: 16, // Horizontal padding for options
      paddingVertical: 10, // Vertical padding for options
      borderBottomWidth: 1, // Border between options
      borderBottomColor: '#ddd', // Border color
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    commentInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
      height: 100,
    },
    upload: {
      marginBottom: 20,
      alignItems: 'center',
    },
    uploadImageContainer: {
      width: '100%',  // Make sure it's responsive
      height: 100,    // Limit the height of the image container
      borderRadius: 8,
      overflow: 'hidden',  // Prevent the image from overflowing the container
      justifyContent: 'center', 
      alignItems: 'center',
    },
    uploadImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',  // This will make the image cover the entire container without overflowing
    },
    uploadButton: {
      marginTop: 10,
      height: 100,
      width: 300,
      paddingVertical: 12,
      paddingHorizontal: 25,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadText: {
      fontSize: 16,
    },
    card:{
        width:350,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:10,
        marginBottom:15
    }
  });

  // State hooks
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Food Quality');
  const [comments, setComments] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  // Dropdown options
  const options = ['Food Quality', 'Quantity', 'Packaging', 'Other Issues'];

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle option selection from dropdown
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Request media library permissions
  const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  // Launch image picker
  const launchImagePickerHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result); // Log the result for debugging
    if (!result.cancelled) {
      // Sanitize the URI to ensure it is correctly passed to the Image component
      const imageUri = result.assets[0].uri;
      setSelectedImage(imageUri);
    }
  };

  // Submit feedback
  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', comments);
    setComments('');
  };

  // Request permissions when component mounts
  useEffect(() => {
    requestImagePermissions();
  }, []);

  return (
    <ScrollView style={styles.screen}>
      {/* Title and Icon */}
      <Icon name="restaurant" size={24} color="black" />
      <Text style={styles.title}>Food Quality Verification</Text>
      <Text style={styles.des}>
        Your feedback helps us improve food redistribution services. Please take a moment to share your experience with the food delivery you received.
      </Text>

      {/* Delivery Confirmation Section */}
      <Text style={styles.sub}>Delivery Confirmation</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirm Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.buttonText2}>Report an Issue</Text>
        </TouchableOpacity>
      </View>

      {/* Feedback Form Section */}
      <Text style={styles.sub}>Feedback Form</Text>
      <View style={styles.container}>
        {/* Dropdown Menu for Issue Selection */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
          <Text style={styles.dropdownText}>{selectedOption}</Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {isOpen && (
          <View style={styles.dropdownOptions}>
            {options.map((option) => (
              <TouchableOpacity key={option} style={styles.dropdownOption} onPress={() => handleOptionSelect(option)}>
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Additional Comments Section */}
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Additional Comments</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Enter your comments here"
          multiline={true}
          value={comments}
          onChangeText={setComments}
        />
        <TouchableOpacity style={styles.confirmButton} onPress={handleSubmitFeedback}>
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Photo Upload Section */}
      <Text style={styles.sub}>Photo Upload</Text>
      <Text style={styles.des}>
        You can upload photos to help us visually verify the quality of the food you received. This is optional but highly appreciated.
      </Text>

      <View style={styles.upload}>
        <TouchableOpacity onPress={launchImagePickerHandler} style={styles.uploadButton}>
          {selectedImage ? (
            // If an image is selected, show the uploaded image and change the button text
            <View style={styles.uploadImageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.uploadImage} />
           
            </View>
          ) : (
            // If no image is selected, show the "Upload Image" text
            <Text style={styles.uploadText}>Upload Image</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sub}>Real-Time Reporting</Text>
      <Text style={styles.des}>If you encounter any issues with your food delivery, please report them immediately. An automated alert will be sent to the admin for resolution.</Text>
      <View style={styles.card}>
        <View style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
            <Image source={require('../../assets/92.png')} style={{ width: 75, height: 75, borderRadius: 100 }} />
            <View>
            <Text style={{fontSize:20,fontWeight:600}}>Average Food Quality</Text>
            <Text style={{fontSize:15,fontWeight:200,}}>3.9</Text>
            </View>
        </View>
        
        </View>
        <View style={[styles.card, {marginBottom:100}]}>
        <View style={{display:'flex', flexDirection:'row', gap:10, alignItems:'center'}}>
            <Image source={require('../../assets/93.png')} style={{ width: 75, height: 75, borderRadius: 100 }} />
            <View>
            <Text style={{fontSize:20,fontWeight:600}}>Most common issue</Text>
            <Text style={{fontSize:15,fontWeight:200,}}>Quality, package</Text>
            </View>
        </View>
        </View>
    </ScrollView>
  );
};

export default Quality;
