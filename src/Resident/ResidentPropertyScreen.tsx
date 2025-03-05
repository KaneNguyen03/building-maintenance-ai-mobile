import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { Property } from '../types';
import { PropertyService } from '../service/propertyservice';

// Mock data (giả sử đã được import từ file khác)
// import { mockData } from '../mock/mockData';
import { useNavigation } from '@react-navigation/native';

const ResidentPropertyScreen = () => {
  const navigation = useNavigation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const userProperties = await PropertyService.getCurrentUserProperties();
      setProperties(userProperties);
    } catch (error) {
      console.error('Lỗi tải thuộc tính:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleCardPress = (property: Property) => {
  //   navigation.navigate('PropertyDetail', { property });
  // };

  const renderPropertyItem = ({ item }: { item: Property }) => {
    return (
      <TouchableOpacity 
        style={styles.propertyCard} 
        // onPress={() => handleCardPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyName}>LUMIÈRE</Text>
          <Text style={styles.propertySubname}>Boulevard</Text>
        </View>
        
        <Text style={styles.apartmentCode}>
          {item.building}{item.floor}.{item.unit}
        </Text>
        
        <Text style={styles.buildingInfo}>
          Tòa {item.building} | Căn hộ
        </Text>
        
        <View style={styles.statusButton}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#B77F2E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {properties.length > 0 ? (
        <FlatList
          data={properties}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderPropertyItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <>
          <Image 
            source={require('../../assets/tower.jpg')} 
            style={styles.image} 
            resizeMode="contain"
          />

          <Text style={styles.title}>Are you the owner or getting invitation by owner?</Text>
          <Text style={styles.description}>
          Track your home's payment, follow up the construction progress or simply manage your homes with our services
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    backgroundColor: '#FFF', 
    padding: 16 
  },
  listContainer: {
    width: '100%',
    paddingVertical: 10
  },
  propertyCard: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  propertyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0d5c3f',
    letterSpacing: 1,
  },
  propertySubname: {
    fontSize: 18,
    color: '#0d5c3f',
  },
  apartmentCode: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buildingInfo: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#B77F2E',
    borderRadius: 20,
  },
  statusText: {
    color: '#B77F2E',
    fontWeight: 'bold',
  },
  //property
  image: { width: 300, height: 300, marginVertical: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  description: { fontSize: 14, textAlign: 'center', color: '#666', paddingHorizontal: 20, marginBottom: 20 },
  button: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2E8D9', padding: 16, borderRadius: 12, width: '90%', justifyContent: 'space-between', marginVertical: 8 },
  buttonText: { flex: 1, fontSize: 16, fontWeight: 'bold', color: '#B77F2E', textAlign: 'center' },
  loadingContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});

export default ResidentPropertyScreen;