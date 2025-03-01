import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PropertyScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Property Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PropertyScreen;