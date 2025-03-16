import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUserStatus = async () => {
    const user = await AsyncStorage.getItem("userData");
    setIsLoggedIn(!!user);
  };

  const fetchNotifications = async () => {
    const userString = await AsyncStorage.getItem("userData");
    if (!userString) return;
  
    const user = JSON.parse(userString);
    const userKey = user.phone.toString();
  
    setLoading(true);
    const data = await AsyncStorage.getItem(`notifications_${userKey}`);
    const parsed = data ? JSON.parse(data) : [];
    setNotifications(parsed);
    setLoading(false);
  };
  

  useEffect(() => {
    fetchUserStatus();
    fetchNotifications();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.notiCard}>
      <Text style={styles.notiMessage}>{item.message}</Text>
      <Text style={styles.notiTime}>{item.timestamp}</Text>
    </View>
  );

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>NOTIFICATION</Text>
        </View>

        {/* UI chưa đăng nhập */}
        <View style={styles.content}>
          <Image
            source={require("../../assets/notification-login.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.noNotificationText}>Bạn Chưa Đăng Nhập</Text>
          <Text style={styles.subText}>Hãy đăng nhập để nhận được thông tin</Text>

          <TouchableOpacity
            style={styles.retryButton}
            // @ts-ignore
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.retryText}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NOTIFICATION</Text>
      </View>

      {notifications.length === 0 ? (
        // Empty notification list
        <View style={styles.content}>
          <Image
            source={require("../../assets/notification.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.noNotificationText}>No notification</Text>
          <Text style={styles.subText}>You don't have any notification yet</Text>

          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchNotifications}
            disabled={loading}
          >
            <Text style={styles.retryText}>{loading ? "Loading..." : "Retry"}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noNotificationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#B77F2E",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  retryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  notiCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#B77F2E",
  },
  notiMessage: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  notiTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default NotificationScreen;
