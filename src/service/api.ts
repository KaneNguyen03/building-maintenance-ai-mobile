import axios from 'axios';
import { Resident, Staff } from '../types';

const RESIDENT_API = 'https://67c56db0351c081993f9c85a.mockapi.io/resident';
const STAFF_API = 'https://67c56db0351c081993f9c85a.mockapi.io/Staff';

export const AuthService = {
  async findResidentByPhone(phone: number): Promise<Resident | null> {
    try {
      const response = await axios.get<Resident[]>(`${RESIDENT_API}?phone=${phone}`);
      return response.data[0] || null;
    } catch (error) {
      console.error('Error finding resident:', error);
      return null;
    }
  },

  async findStaffByEmail(email: string): Promise<Staff | null> {
    try {
      const response = await axios.get<Staff[]>(`${STAFF_API}?email=${email}`);
      return response.data[0] || null;
    } catch (error) {
      console.error('Error finding staff:', error);
      return null;
    }
  }
};