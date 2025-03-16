import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Property } from "../../types";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RepairReviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property, description, images } = route.params as {
    property: Property;
    description: string;
    images: string[];
  };
  const handleSubmit = async () => {
    const userData = await AsyncStorage.getItem("userData");
    const user = userData ? JSON.parse(userData) : null;
    if (!user) return;
  
    const userKey = user.phone.toString(); // phone là số => chuyển thành string
  
    const reportKey = `myReports_${userKey}`;
    const notiKey = `notifications_${userKey}`;
  
    const report = {
      property,
      description,
      images,
      date: new Date().toISOString(),
    };
  
    const existingReports = await AsyncStorage.getItem(reportKey);
    const parsedReports = existingReports ? JSON.parse(existingReports) : [];
    parsedReports.push(report);
    await AsyncStorage.setItem(reportKey, JSON.stringify(parsedReports));
  
    const now = new Date();
    const newNotification = {
      id: `${now.getTime()}`,
      message: "Report của bạn đang được xử lý, vui lòng đợi phản hồi.",
      timestamp: now.toLocaleString(),
    };
    const existingNoti = await AsyncStorage.getItem(notiKey);
    const notiList = existingNoti ? JSON.parse(existingNoti) : [];
    notiList.unshift(newNotification);
    await AsyncStorage.setItem(notiKey, JSON.stringify(notiList));
  
    //@ts-ignore
    navigation.navigate("RepairSuccess");
  };
  


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kiểm tra thông tin</Text>
      </View>

      {/* Thông tin căn hộ */}
      <View style={styles.propertyCard}>
        <Text style={styles.propertyName}>LUMIÈRE</Text>
        <Text style={styles.propertySubname}>Boulevard</Text>
        <Text style={styles.apartmentCode}>
          {property.building} {property.unit}
        </Text>
        <Text style={styles.buildingInfo}>
          Tòa {property.building} | Tầng {property.floor}
        </Text>
        <View style={styles.statusButton}>
          <Text style={styles.statusText}>{property.status}</Text>
        </View>
      </View>

      {/* Miêu tả */}
      <Text style={styles.label}>Chi tiết mô tả</Text>
      <Text style={styles.descriptionBox}>{description}</Text>

      {/* Danh sách ảnh */}
      <Text style={styles.label}>Hình ảnh đính kèm</Text>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>

      {/* Nút Gửi yêu cầu */}
      <TouchableOpacity style={styles.sendButton} onPress={handleSubmit}>
        <Text style={styles.sendButtonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 10, marginRight: 10 },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  propertyCard: {
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propertyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0d5c3f",
    letterSpacing: 1,
  },
  propertySubname: {
    fontSize: 16,
    color: "#0d5c3f",
  },
  apartmentCode: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  buildingInfo: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  statusButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#B77F2E",
    borderRadius: 20,
  },
  statusText: {
    color: "#B77F2E",
    fontWeight: "bold",
  },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  descriptionBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#f9f9f9",
  },
  imageContainer: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  image: { width: 100, height: 100, borderRadius: 8 },
  sendButton: {
    marginTop: 20,
    backgroundColor: "#B77F2E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  sendButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default RepairReviewScreen;
