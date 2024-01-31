import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const DebitCardImage = ({ lastFourDigits }) => {
  return (
    <View style={styles.container}>
      {/* Debit card image */}
      <Image
        source={require('../assets/debit.png')}
        style={styles.cardImage}
        resizeMode="cover"
      />

      {/* Display the last four digits */}
      <Text style={styles.lastFourDigits}>{`**** **** **** ${lastFourDigits}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    width: 300, // Adjust the width as needed
    height: 180, // Adjust the height as needed
    
  },
  lastFourDigits: {
    marginTop: -60,
    fontSize: 18,
    fontWeight: 'bold',
     color: 'white', // Set the text color to white
  },
});

export default DebitCardImage;
