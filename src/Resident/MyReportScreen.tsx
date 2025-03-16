import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const MyReportScreen = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadReports = async () => {
      const userString = await AsyncStorage.getItem("userData");
      if (!userString) return;
    
      const user = JSON.parse(userString);
      const userKey = user.phone.toString();
    
      const stored = await AsyncStorage.getItem(`myReports_${userKey}`);
      if (stored) setReports(JSON.parse(stored));
    };
    const unsubscribe = navigation.addListener("focus", loadReports);
    return unsubscribe;
  }, [navigation]);

  const handleClearAll = async () => {
    const userString = await AsyncStorage.getItem("userData");
    if (!userString) return;
  
    const user = JSON.parse(userString);
    const userKey = user.phone.toString();
  
    await AsyncStorage.removeItem(`myReports_${userKey}`);
    setReports([]);
  };

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#B77F2E" />
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Reports ({reports.length})</Text>
        {reports.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn}>
            <Icon name="delete" size={20} color="#B77F2E" />
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>

      {reports.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image
            source={require("../../assets/sadBuilding.png")}
            style={styles.emptyImage}
          />
          <Text style={styles.emptyText}>Chưa có báo cáo nào.</Text>
        </View>
      ) : (
        reports.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.unitText}>
                  {item.property.building} {item.property.unit}
                </Text>
                <Text style={styles.dateText}>
                  {new Date(item.date).toLocaleString()}
                </Text>
              </View>
              <View style={styles.statusTag}>
                <Text style={styles.statusText}>Pending</Text>
              </View>
            </View>
            <Text style={styles.descriptionText}>{item.description}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {item.images.map((img: string, idx: number) => (
                <Image
                  key={idx}
                  source={{ uri: img }}
                  style={styles.reportImage}
                />
              ))}
            </ScrollView>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16, marginTop: 50 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: "bold" },
  clearBtn: { flexDirection: "row", alignItems: "center" },
  clearText: { marginLeft: 4, color: "#B77F2E", fontWeight: "600" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    alignItems: "center",
  },
  unitText: { fontWeight: "bold", fontSize: 16, color: "#0d5c3f" },
  dateText: { color: "#999", fontSize: 12, marginTop: 4 },
  statusTag: {
    backgroundColor: "#FFF3E0",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    color: "#B77F2E",
    fontWeight: "bold",
  },
  descriptionText: { fontSize: 14, marginBottom: 10, color: "#333" },
  reportImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  emptyImage: { width: 200, height: 200, marginBottom: 20 },
  emptyText: { color: "#999", fontSize: 16 },
});

export default MyReportScreen;
