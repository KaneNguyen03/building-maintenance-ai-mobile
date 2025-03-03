import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ResidentPropertyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>PROPERTY</Text>

      <Image 
        source={require('../../assets/tower.jpg')} 
        style={styles.image} 
        resizeMode="contain"
      />

      <Text style={styles.title}>Are you the owner or getting invitation by owner?</Text>
      <Text style={styles.description}>
        Track your home's payment, follow up the construction progress or simply manage your homes with our services
      </Text>

      <TouchableOpacity style={styles.button}>
        <Icon name="crown" size={24} color="#B77F2E" />
        <Text style={styles.buttonText}>Owner</Text>
        <Icon name="chevron-right" size={24} color="#B77F2E" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Icon name="group" size={24} color="#B77F2E" />
        <Text style={styles.buttonText}>Invited by Owner</Text>
        <Icon name="chevron-right" size={24} color="#B77F2E" />
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
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2E8D9', padding: 16, borderRadius: 12, width: '90%', justifyContent: 'space-between', marginVertical: 8 },
  buttonText: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#B77F2E', textAlign: 'center' }
});

export default ResidentPropertyScreen;
