// src/screen/SignInScreen.tsx
import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, 
  Platform, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
// import { mockData } from '../mock/mockData';
import { AuthService } from '../service/api';

type SignInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;

const SignInScreen = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<'resident' | 'staff'>('resident'); 
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNext = async () => {
    try {
      if (activeTab === 'resident') {
        const resident = await AuthService.findResidentByPhone(Number(phone));
        
        if (resident) {
          navigation.navigate('OTPScreen', { 
            userType: 'resident', 
            identifier: phone 
          });
        } else {
          Alert.alert("Lỗi", "Số điện thoại không tồn tại");
        }
      } else {
        const staff = await AuthService.findStaffByEmail(email);
        
        if (staff) {
          navigation.navigate('OTPScreen', { 
            userType: 'staff', 
            identifier: email 
          });
        } else {
          Alert.alert("Lỗi", "Email không tồn tại");
        }
      }
    } catch (error) {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Sign In</Text>

      {/* Tabs for Resident and Staff */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'resident' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('resident')}
        >
          <Text style={activeTab === 'resident' ? styles.activeTabText : styles.inactiveTabText}>
            Resident
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'staff' ? styles.activeTab : styles.inactiveTab]}
          onPress={() => setActiveTab('staff')}
        >
          <Text style={activeTab === 'staff' ? styles.activeTabText : styles.inactiveTabText}>
            Staff
          </Text>
        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>
          {activeTab === 'resident' ? "What's your phone?" : "What's your email?"}
        </Text>

        {activeTab === 'resident' ? (
          <TextInput
            style={styles.input}
            placeholder="0123456789"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoCapitalize="none"
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      </View>

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={handleNext}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  backButton: {
    marginTop: 20,
    padding: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  tabContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 36,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#F2E8D9',
    borderColor: '#B77F2E',
    borderWidth: 1,
  },
  inactiveTab: {
    backgroundColor: '#F5F5F5',
  },
  activeTabText: {
    color: '#B77F2E',
    fontWeight: '500',
    fontSize: 16,
  },
  inactiveTabText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 16,
  },
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#B77F2E',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SignInScreen;