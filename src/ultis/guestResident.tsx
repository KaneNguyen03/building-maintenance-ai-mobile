import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkResidentStatus = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.userType === 'resident';
    }
    return false;
  } catch (error) {
    console.error("Error checking resident status:", error);
    return false;
  }
};
