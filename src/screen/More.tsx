// src/screen/MoreScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MoreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'More'>;

const MoreScreen = () => {
  const navigation = useNavigation<MoreScreenNavigationProp>();
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      Alert.alert('Thành công', 'Đăng xuất thành công', [
        { text: 'OK', onPress: () => navigation.navigate('MainApp') }
      ]);
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>More</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {userData && (
          <View style={styles.userHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            </View>
            <Text style={styles.userName}>{userData.name || 'Người dùng'}</Text>
          </View>
        )}

        <View style={styles.menuOptions}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="language" size={24} color="#666" />
            <Text style={styles.menuText}>Languege</Text>
            <Text style={styles.menuValue}>English</Text>
            <Icon name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-outline" size={24} color="#666" />
            <Text style={styles.menuText}>How to Use</Text>
            <Icon name="chevron-right" size={24} color="#666" style={styles.chevron} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="info" size={24} color="#666" />
            <Text style={styles.menuText}>About Us</Text>
            <Icon name="chevron-right" size={24} color="#666" style={styles.chevron} />
          </TouchableOpacity>
          
          {userData && (
            <>
              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <Icon name="logout" size={24} color="#666" />
                <Text style={styles.menuText}>Đăng xuất</Text>
                <Icon name="chevron-right" size={24} color="#666" style={styles.chevron} />
              </TouchableOpacity>
              
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.copyrightText}>Copyright©2023</Text>
        <Text style={styles.copyrightText}>Bản quyền thuộc về BMCMS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  userHeader: {
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#B77F2E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuOptions: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  menuValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  chevron: {
    marginLeft: 'auto',
  },
  dangerItem: {
    marginTop: 16,
  },
  dangerText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: '#ff3b30',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
  },
});

export default MoreScreen;