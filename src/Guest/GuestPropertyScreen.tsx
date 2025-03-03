import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const GuestPropertyScreen = ({ onSignIn }: { onSignIn: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>PROPERTY</Text>

      <Image 
        source={require('../../assets/tower.jpg')} 
        style={styles.image} 
        resizeMode="contain"
      />

      <Text style={styles.title}>You own any Masterise product?</Text>
      <Text style={styles.description}>Sign in to manage all your properties now.</Text>

      <TouchableOpacity style={styles.signInButton} onPress={onSignIn}>
        <Text style={styles.signInButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#FFF', padding: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#000' },
  image: { width: 300, height: 300, marginVertical: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 14, textAlign: 'center', color: '#666', paddingHorizontal: 20, marginBottom: 20 },
  signInButton: { backgroundColor: '#B77F2E', borderRadius: 12, padding: 18, alignItems: 'center', width: '90%' },
  signInButtonText: { color: 'white', fontSize: 18, fontWeight: '500' }
});

export default GuestPropertyScreen;
