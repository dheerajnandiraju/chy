import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PurchaseDetails = ({ route, navigation }) => {
  const { purchaseType } = route.params;

  const [price, setPrice] = useState('');
  const [cropDetails, setCropDetails] = useState('');
  const [buyer, setBuyer] = useState('');

  const handleSave = () => {
    // Logic to save purchase details
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{purchaseType === 'pending' ? 'Pending Purchase' : 'Completed Purchase'}</Text>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Enter price"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Crop Details</Text>
      <TextInput
        style={styles.input}
        value={cropDetails}
        onChangeText={setCropDetails}
        placeholder="Details of the crop"
        multiline
      />

      {purchaseType === 'pending' && (
        <View>
          <Text style={styles.label}>Sell To</Text>
          <TouchableOpacity onPress={() => setBuyer('NGO')}>
            <Text style={styles.option}>NGO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setBuyer('Foodbank')}>
            <Text style={styles.option}>Foodbank</Text>
          </TouchableOpacity>
        </View>
      )}

      {purchaseType === 'completed' && (
        <View>
          <Text style={styles.label}>Bought By</Text>
          <Text style={styles.input}>{buyer}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
  option: {
    fontSize: 16,
    color: '#00BCD4',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#00BCD4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PurchaseDetails;
