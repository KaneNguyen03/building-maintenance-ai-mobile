// src/components/screen/AccountScreen.tsx

import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';



type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>;
const AccountScreen = () => {
 const navigation = useNavigation<AccountScreenNavigationProp>();
  
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ACCOUNT</Text>
      
      {/* Guest profile section */}
      <TouchableOpacity style={styles.profileCard} onPress={handleSignIn}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>G</Text>
        </View>
        <Text style={styles.guestText}>Guest</Text>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Menu items */}
      <View style={styles.menuContainer}>
        {/* User guide */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#FAE8D2' }]}>
            <Icon name="menu-book" size={24} color="#B77F2E" />
          </View>
          <Text style={styles.menuText}>User guide</Text>
          <Icon name="chevron-right" size={24} color="#CCCCCC" />
        </TouchableOpacity>

        {/* About us */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={[styles.iconContainer, { backgroundColor: '#F2E8D9' }]}>
            <Icon name="business" size={24} color="#B77F2E" />
          </View>
          <Text style={styles.menuText}>About us</Text>
          <Icon name="chevron-right" size={24} color="#CCCCCC" />
        </TouchableOpacity>
      </View>

      {/* App version and copyright info */}
      <View style={styles.footerContainer}>
        <Text style={styles.copyrightText}>Copyright©2025</Text>
        <Text style={styles.copyrightText}>Allright reserved by BMCMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 24,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF7F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5B9BD5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  guestText: {
    fontSize: 24,
    fontWeight: '500',
    marginLeft: 16,
    flex: 1,
  },
  signInText: {
    color: '#B77F2E',
    fontSize: 16,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 70, // Để không bị che bởi bottom tab navigator
  },
  versionText: {
    color: '#AAAAAA',
    fontSize: 14,
    marginBottom: 4,
  },
  copyrightText: {
    color: '#AAAAAA',
    fontSize: 14,
  },
});

export default AccountScreen;