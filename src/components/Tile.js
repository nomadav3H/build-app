import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Tile = ({ title, description, children  }) => {
  return (
    <View style={styles.tile}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.centeredContent}>{children}</View>
    </View>
  );
};


const styles = StyleSheet.create({
  tile: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    margin: 8,
    width: '80%',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
});

export default Tile;
