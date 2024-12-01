import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  Switch, 
  Image,
  Alert 
} from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';
// import PubNubReact from 'pubnub-react';

export default class App extends Component {
  // constructor(props) {
  //   super(props);

  //   // Use environment variables for PubNub keys
  //   this.pubnub = new PubNubReact({
  //     publishKey: process.env.PUBNUB_PUBLISH_KEY,
  //     subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
  //     uuid: `user-${Math.random().toString(36).substr(2, 9)}`
  //   });

  //   this.state = {
  //     currentLoc: {
  //       latitude: 36.81808,
  //       longitude: -98.640297
  //     },
  //     numUsers: 0,
  //     fixedOnUUID: "",
  //     focusOnMe: false,
  //     users: new Map(),
  //     allowGPS: true,
  //     userCount: 0,
  //     locationError: null
  //   };

  //   this.pubnub.init(this);
  // }

  // async componentDidMount() {
  //   try {
  //     await this.setupLocationPermissions();
  //     this.setupPubNubListeners();
  //   } catch (error) {
  //     this.handleLocationError(error);
  //   }
  // }

  // setupLocationPermissions = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== 'granted') {
  //     this.handleLocationError(new Error('Location permission denied'));
  //     return;
  //   }

  //   // Start tracking location with more robust error handling
  //   try {
  //     this.locationSubscription = await Location.watchPositionAsync(
  //       {
  //         accuracy: Location.Accuracy.High,
  //         timeInterval: 10000,  // Increased interval for battery efficiency
  //         distanceInterval: 20  // Slightly increased to reduce unnecessary updates
  //       },
  //       this.handleLocationUpdate
  //     );
  //   } catch (error) {
  //     this.handleLocationError(error);
  //   }
  // }

  // handleLocationError = (error) => {
  //   console.error('Location Error:', error);
  //   this.setState({ 
  //     allowGPS: false, 
  //     locationError: error.message 
  //   });

  //   // Show user-friendly alert
  //   Alert.alert(
  //     'Location Error', 
  //     error.message || 'Unable to access location services',
  //     [{ text: 'OK' }]
  //   );
  // }

  // handleLocationUpdate = (location) => {
  //   const { coords } = location;
    
  //   if (this.state.allowGPS) {
  //     const newLocation = {
  //       latitude: coords.latitude,
  //       longitude: coords.longitude
  //     };

  //     this.setState({
  //       currentLoc: newLocation
  //     });

  //     // Publish location to PubNub with more detailed message
  //     this.pubnub.publish({
  //       message: {
  //         ...newLocation,
  //         timestamp: Date.now(),
  //         uuid: this.pubnub.getUUID()
  //       },
  //       channel: "global"
  //     });
  //   }
  // }

  // setupPubNubListeners() {
  //   this.pubnub.subscribe({
  //     channels: ["global"],
  //     withPresence: true
  //   });

  //   this.pubnub.getMessage("global", (msg) => {
  //     let users = new Map(this.state.users);

  //     // Handle user removal
  //     if (msg.message.hideUser) {
  //       users.delete(msg.publisher);
  //       this.setState({ users, userCount: users.size });
  //       return;
  //     }

  //     // Update or add user with timestamp
  //     const newUser = {
  //       uuid: msg.publisher,
  //       latitude: msg.message.latitude,
  //       longitude: msg.message.longitude,
  //       timestamp: msg.message.timestamp || Date.now()
  //     };

  //     users.set(newUser.uuid, newUser);
  //     this.setState({ 
  //       users,
  //       userCount: users.size
  //     });
  //   });
  // }

  // toggleGPS = () => {
  //   const newGPSState = !this.state.allowGPS;
    
  //   this.setState({ allowGPS: newGPSState }, () => {
  //     if (!newGPSState) {
  //       // Publish hide message when GPS is turned off
  //       this.pubnub.publish({
  //         message: { 
  //           hideUser: true,
  //           uuid: this.pubnub.getUUID()
  //         },
  //         channel: "global"
  //       });
  //     } else {
  //       // Republish current location when GPS is turned on
  //       if (this.state.currentLoc.latitude !== -1) {
  //         this.pubnub.publish({
  //           message: {
  //             ...this.state.currentLoc,
  //             uuid: this.pubnub.getUUID()
  //           },
  //           channel: "global"
  //         });
  //       }
  //     }
  //   });
  // }

  // focusLoc = () => {
  //   if (this.state.currentLoc.latitude !== -1 && this.map) {
  //     const region = {
  //       latitude: this.state.currentLoc.latitude,
  //       longitude: this.state.currentLoc.longitude,
  //       latitudeDelta: 0.01,
  //       longitudeDelta: 0.01
  //     };
  //     this.map.animateToRegion(region, 1000);
  //   }
  // }

  // componentWillUnmount() {
  //   // Cleanup subscriptions
  //   if (this.locationSubscription) {
  //     this.locationSubscription.remove();
  //   }
  //   this.pubnub.unsubscribe({ channels: ["global"] });
  // }

  render() {
    // const usersArray = Array.from(this.state.users.values());

    return (
      // <View style={styles.container}>
      //   <MapView
      //     style={styles.map}
      //     ref={ref => (this.map = ref)}
      //     initialRegion={{
      //       latitude: 36.81808,
      //       longitude: -98.640297,
      //       latitudeDelta: 60.0001,
      //       longitudeDelta: 60.0001
      //     }}
      //   >
      //     {usersArray.map((item) => (
      //       <Marker
      //         key={item.uuid}
      //         coordinate={{
      //           latitude: item.latitude,
      //           longitude: item.longitude
      //         }}
      //         pinColor="blue"  // Simple color marker
      //         title={`User ${item.uuid}`}
      //       />
      //     ))}
      //   </MapView>

      //   <View style={styles.topBar}>
      //     <View style={styles.leftBar}>
      //       <View style={styles.userCount}>
      //         <Text>Users: {this.state.userCount}</Text>
      //       </View>
      //     </View>
      //   </View>

      //   <View style={styles.topBar}>
      //     <View style={styles.rightBar}>
      //       <Switch
      //         value={this.state.allowGPS}
      //         style={styles.locationSwitch}
      //         onValueChange={this.toggleGPS}
      //       />
      //     </View>
      //   </View>

      //   <View style={styles.bottom}>
      //     <View style={styles.bottomRow}>   
      //       <TouchableOpacity onPress={this.focusLoc}>
      //         <Image 
      //           style={styles.focusLoc} 
      //           source={require('./assets/2.png')}
      //         />
      //       </TouchableOpacity>
      //     </View>
      //   </View>

      //   {this.state.locationError && (
      //     <View style={styles.errorContainer}>
      //       <Text style={styles.errorText}>{this.state.locationError}</Text>
      //     </View>
      //   )}
      // </View>
      <View>
        <Text>ggggg</Text>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   // ... [previous styles remain the same]
//   errorContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'red',
//     padding: 10,
//   },
//   errorText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });