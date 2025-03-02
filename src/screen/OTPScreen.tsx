// src/screen/OTPScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { mockData } from '../mock/mockData';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPScreen'>;

const OTPScreen = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as { userType: 'resident' | 'staff'; identifier: string };
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeText = (text: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus to next input
    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    
    if (params.userType === 'resident') {
      const resident = mockData.residents.find(r => r.phone === params.identifier);
      if (resident && resident.otp === enteredOtp) {
        // Lưu thông tin người dùng
        await AsyncStorage.setItem('userData', JSON.stringify({
          name: resident.name,
          phone: resident.phone,
          userType: 'resident'
        }));
        
        Alert.alert("Success", `Welcome ${resident.name}`, [
          { text: "OK", onPress: () => navigation.navigate('MainApp') }
        ]);
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    } else {
      const staff = mockData.staff.find(s => s.email === params.identifier);
      if (staff && staff.otp === enteredOtp) {
        // Lưu thông tin người dùng
        await AsyncStorage.setItem('userData', JSON.stringify({
          name: staff.name,
          email: staff.email,
          userType: 'staff'
        }));
        
        Alert.alert("Success", `Welcome ${staff.name}`, [
          { text: "OK", onPress: () => navigation.navigate('MainApp') }
        ]);
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
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

      <Text style={styles.headerTitle}>Enter OTP</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>
          Enter verification code sent to{" "}
          {params.identifier}
        </Text>
        
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => inputRefs.current[index] = ref}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
      </View>

      {/* Verify Button */}
      <TouchableOpacity
        style={[
          styles.verifyButton,
          otp.join('').length === 4 ? styles.verifyButtonActive : styles.verifyButtonInactive
        ]}
        onPress={handleVerify}
        disabled={otp.join('').length !== 4}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
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
  inputSection: {
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 16,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 12,
    fontSize: 24,
    fontWeight: 'bold',
  },
  verifyButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  verifyButtonActive: {
    backgroundColor: '#B77F2E',
  },
  verifyButtonInactive: {
    backgroundColor: '#CCCCCC',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default OTPScreen;