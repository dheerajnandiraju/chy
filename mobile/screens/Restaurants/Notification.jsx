
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button,  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import   { useNavigation } from '@react-navigation/native';
const styles = StyleSheet.create({
    screen:{
        backgroundColor:'#F6F8F9',
        paddingTop: 30,
        padding:25,
        flex:1.
      },
    smallFont:{
        fontSize:16,
        },
        statusItem: {
            marginBottom: 10,
            backgroundColor:'white',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
          },
          statusIcon: {
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          },
          statusText: {
            fontSize: 16,
          },
          container: {
            position: 'absolute',
            bottom:10,
            left: 10,
            right: 10,
            marginTop:10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#fff', // Change background color as needed
            padding: 10,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 2,
          },
})

const Notification = () => {
    const navigation = useNavigation();
    const handleIconPress = (screenName) => {
        navigation.navigate(screenName);
      };

    const orderStatuses = [
        {
            status: "Delivered",
            icon: "check-circle",
            color: "green",
        },
        {
            status: "Delivered",
            icon: "check-circle",
            color: "green",
        },
        {
            status: "Delivered",
            icon: "check-circle",
            color: "green",
        },
        {
            status: "Pickup",
            icon: "truck",
            color: "black",
        },
        {
            status: "Complaint Raised",
            icon: "exclamation-triangle",
            color: "red",
        },
    ];


  return (
    <View style={styles.screen}>
          <Text style={[styles.boldText, styles.smallFont]}>Notification</Text>
          <View style={{marginTop:10}}>
      {orderStatuses.map((status, index) => (
        <View key={index} style={styles.statusItem}>
          <View style={[styles.statusIcon, { backgroundColor: status.color }]}>
            <FontAwesome5 name={status.icon} size={20} color="white" />
          </View>
          <Text style={styles.statusText}>{status.status}</Text>
        </View>
      ))}
    </View>

    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleIconPress('Home')}>
        <FontAwesome5 name="home" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('RestaurantsDashboard')}>
        <FontAwesome5 name="th-large" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('Leaderboard')}>
        <FontAwesome5 name="award" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleIconPress('Statistics')}>
        <FontAwesome5 name="chart-pie" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
  )
}

export default Notification
