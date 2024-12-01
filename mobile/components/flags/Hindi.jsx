import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function HindiLetter(props) {
  return (
    <View style={styles.container} {...props}>
      <Text style={styles.text}>HI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HindiLetter;
