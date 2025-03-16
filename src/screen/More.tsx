import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type MoreScreenNavigationProp = StackNavigationProp<RootStackParamList, "More">;

const MoreScreen = () => {
  const navigation = useNavigation<MoreScreenNavigationProp>();
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("userData");
        if (data) {
          setUserData(JSON.parse(data));
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate("MainApp");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
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
                {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </Text>
            </View>
            <Text style={styles.userName}>{userData.name || "Người dùng"}</Text>
          </View>
        )}

        <View style={styles.menuOptions}>
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#E3F2FD" }]}
            >
              <Icon name="language" size={24} color="#4CB5F5" />
            </View>
            <Text style={styles.menuText}>Language</Text>
            <Text style={styles.menuValue}>English</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />

          </TouchableOpacity>
          {/* FAQ */}
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#EDE7F6" }]}
            >
              <Icon name="help-outline" size={24} color="#A084E8" />
            </View>
            <Text style={styles.menuText}>FAQ</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          {/* How to Use */}
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#FFF3E0" }]}
            >
              <Icon2 name="book" size={24} color="#F4C27F" />
            </View>
            <Text style={styles.menuText}>How to Use</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          {/* About Us */}
          <TouchableOpacity style={styles.menuItem}>
            <View
              style={[styles.iconContainer, { backgroundColor: "#EFEBE9" }]}
            >
              <Icon name="info-outline" size={24} color="#B77F2E" />
            </View>
            <Text style={styles.menuText}>About Us</Text>
            <Icon
              name="chevron-right"
              size={24}
              color="#666"
              style={styles.chevron}
            />
          </TouchableOpacity>

          {/* Logout */}
          {userData && (
            <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
              <View
                style={[styles.iconContainer, { backgroundColor: "#F5F5F5" }]}
              >
                <Icon name="logout" size={24} color="#E8D6C1" />
              </View>
              <Text style={styles.menuText}>Log Out</Text>
              <Icon
                name="chevron-right"
                size={24}
                color="#666"
                style={styles.chevron}
              />
            </TouchableOpacity>
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
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  userHeader: {
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#B77F2E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuOptions: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    marginLeft: "auto",
  },
  footer: {
    padding: 16,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  copyrightText: {
    fontSize: 12,
    color: "#999",
  },
  menuValue:{
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  }
});

export default MoreScreen;
