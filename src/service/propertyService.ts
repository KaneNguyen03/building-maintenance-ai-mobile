import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Resident, Property } from '../types';

const PROPERTY_API = 'https://67c56db0351c081993f9c85a.mockapi.io/resident';

export const PropertyService = {
  async getCurrentUserProperties(): Promise<Property[]> {
    try {
      // Lấy thông tin người dùng từ AsyncStorage
      const userDataString = await AsyncStorage.getItem('userData');
      
      if (!userDataString) {
        return [];
      }

      const userData = JSON.parse(userDataString);

      // Tìm resident theo số điện thoại
      const response = await axios.get<Resident[]>(`${PROPERTY_API}?phone=${userData.phone}`);
      
      return response.data[0]?.property || [];
    } catch (error) {
      console.error('Lỗi lấy thuộc tính:', error);
      return [];
    }
  }
};