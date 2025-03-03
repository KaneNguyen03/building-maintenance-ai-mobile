// src/screen/PropertyDetailScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

const PropertyDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property } = route.params as { property: any };

  const services = [
    { id: "1", name: "Cư dân", icon: "people" },
    { id: "2", name: "Sửa chữa trong nhà", icon: "build" },
    { id: "3", name: "Sữa Chừa ngoài Nhà", icon: "apartment" },
  ];

  return (
    <View style={styles.container}>
      {/* Header với nút Back */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {property.building}
          {property.floor}.{property.unit}
        </Text>
      </View>

      {/* Card căn hộ */}
      <View style={styles.propertyCard}>
        <Text style={styles.propertyText}>
          Tòa {property.building} ({property.building}) | Căn hộ
        </Text>
        <Text style={styles.statusText}>{property.status}</Text>
      </View>

      {/* Danh sách tiện ích */}
      <Text style={styles.sectionTitle}>Dịch vụ</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.serviceItem}
            onPress={() => {
              if (item.name === "Sửa chữa trong nhà") {
                //@ts-ignore
                navigation.navigate("RepairInside");
              }
            }}
          >
            <Icon name={item.icon} size={40} color="#B77F2E" />
            <Text style={styles.serviceText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 10, marginRight: 10 }, // Nút Back có padding để dễ bấm hơn
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  propertyCard: {
    backgroundColor: "#F2E8D9",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  propertyText: { fontSize: 18, fontWeight: "bold" },
  statusText: { fontSize: 16, color: "#B77F2E", marginTop: 5 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  serviceItem: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    margin: 10,
    backgroundColor: "#F2E8D9",
    borderRadius: 12,
  },
  serviceText: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});

export default PropertyDetailScreen;
