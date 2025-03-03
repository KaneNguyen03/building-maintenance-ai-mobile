import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { checkResidentStatus } from '../ultis/guestResident';
import GuestPropertyScreen from '../Guest/GuestPropertyScreen';
import ResidentPropertyScreen from '../Resident/ResidentPropertyScreen';
import { useNavigation } from '@react-navigation/native';

const PropertyScreen = () => {
  const [isResident, setIsResident] = useState<boolean | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStatus = async () => {
      const status = await checkResidentStatus();
      setIsResident(status);
    };
    fetchStatus();
  }, []);

  if (isResident === null) return <View />; // Chờ tải dữ liệu
  // @ts-ignore
  return isResident ? <ResidentPropertyScreen /> :  <GuestPropertyScreen onSignIn={() => navigation.navigate('SignIn')} />;
};

export default PropertyScreen;
