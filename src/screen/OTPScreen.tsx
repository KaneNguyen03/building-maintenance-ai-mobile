import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { AuthService } from '../service/api';

type OTPScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OTPScreen'>;

const OTPScreen = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as { userType: 'resident' | 'staff'; identifier: string };
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);

  // Animation state
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const borderColorAnimation = useRef(new Animated.Value(0)).current;

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangeText = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError(false); // Reset lỗi khi nhập mới

    if (text.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const enteredOtp = otp.join('');
      let isValid = false;
      let userData = null;

      if (params.userType === 'resident') {
        const resident = await AuthService.findResidentByPhone(Number(params.identifier));
        if (resident && resident.otp === enteredOtp) {
          isValid = true;
          userData = { name: resident.name, phone: resident.phone, userType: 'resident' };
        }
      } else {
        const staff = await AuthService.findStaffByEmail(params.identifier);
        if (staff && staff.otp === enteredOtp) {
          isValid = true;
          userData = { name: staff.name, email: staff.email, userType: 'staff' };
        }
      }

      if (isValid) {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        navigation.navigate('MainApp');
      } else {
        setError(true);
        triggerErrorAnimation(); // Kích hoạt hiệu ứng khi OTP sai
      }
    } catch (error) {
      setError(true);
      triggerErrorAnimation();
    }
  };

  // Shake + Border Color Animation when OTP is wrong
  const triggerErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();

    Animated.timing(borderColorAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(borderColorAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
    });
  };

  const borderColor = borderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CCCCCC', 'red']
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.headerTitle}>Enter OTP</Text>

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Enter verification code sent to {params.identifier}</Text>
        
        <Animated.View style={[styles.otpContainer, { transform: [{ translateX: shakeAnimation }] }]}>
          {otp.map((digit, index) => (
            <Animated.View key={index} style={[styles.otpWrapper, { borderColor }]}>
              <TextInput
                ref={ref => inputRefs.current[index] = ref}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            </Animated.View>
          ))}
        </Animated.View>

        {error && <Text style={styles.errorText}>Wrong OTP, Please re-enter</Text>}
      </View>

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
  otpWrapper: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpInput: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
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
