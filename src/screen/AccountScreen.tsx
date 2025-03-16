// src/screen/AccountScreen.tsx
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MainApp"
>;

const AccountScreen = () => {
  const navigation = useNavigation<AccountScreenNavigationProp>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        setUserData(userData);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái đăng nhập:", error);
    }
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  const navigateToMore = () => {
    navigation.navigate("More");
  };

  const handleChangePassword = () => {
    // Xử lý đổi mật khẩu
    Alert.alert("Thông báo", "Chức năng đổi mật khẩu sẽ được phát triển sau");
  };

  // UI cho người dùng chưa đăng nhập
  const renderGuestUI = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
        </View>

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.optionsList}>
          <TouchableOpacity style={styles.optionItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
            >
              <Icon name="language" size={24} color="#4CB5F5" />
            </View>
            <Text style={styles.optionText}>Language</Text>
            <Text style={styles.menuValue}>English</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#EFEBE9" }]}
            >
              <Icon name="info-outline" size={24} color="#B77F2E" />
            </View>
            <Text style={styles.optionText}>About Us</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // UI cho người dùng đã đăng nhập
  const renderUserUI = () => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Account</Text>
          <TouchableOpacity onPress={navigateToMore} style={styles.menuButton}>
            <Icon name="menu" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
            </Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userData?.name || "Resident"}</Text>
            <Text style={styles.userContact}>
              {userData?.phone || userData?.email || ""}
            </Text>
          </View>
        </View>

        <View style={styles.cardsContainer}>
          <TouchableOpacity style={styles.card}>
            <Icon name="description" size={24} color="#000" />
            <Text style={styles.cardText}>MyReport</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Icon name="bookmarks" size={24} color="#000" />
            <Text style={styles.cardText}>My review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.optionsList}>
          <TouchableOpacity style={styles.optionItem}>
            <Icon name="location-on" size={24} color="#666" />
            <Text style={styles.optionText}>Address</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={handleChangePassword}
          >
            <Icon name="lock" size={24} color="#666" />
            <Text style={styles.optionText}>ChangePassword</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return isLoggedIn ? renderUserUI() : renderGuestUI();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 8,
  },
  signInButton: {
    backgroundColor: "#B77F2E",
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  optionsList: {
    marginTop: 16,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    marginLeft: "auto",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    margin: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#B77F2E",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  userDetails: {
    flex: 1,
    marginLeft: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userContact: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  qrContainer: {
    padding: 8,
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
  },
  card: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  cardText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuValue:{
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  }
});

export default AccountScreen;
