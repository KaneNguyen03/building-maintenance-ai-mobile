import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Property } from "../../types";

const RepairInsideScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { property } = route.params as { property: Property };

  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handlePickImage = async () => {
    Keyboard.dismiss();
    setTimeout(() => {
      pickImage();
    }, 100);
  };

  const isFormValid = description.trim().length >= 5 && images.length > 0;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu cầu sửa chữa</Text>
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

      {/* Nhập mô tả */}
      <Text style={styles.label}>Chi tiết</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập miêu tả"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {description.trim().length < 5 && (
        <Text style={styles.warningText}>Nhập ít nhất 5 ký tự mô tả</Text>
      )}

      {/* Thêm hình ảnh */}
      <Text style={styles.label}>Thêm hình ảnh</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Icon name="add-a-photo" size={30} color="#B77F2E" />
        <Text>Chọn ảnh</Text>
      </TouchableOpacity>

      {/* Hiển thị ảnh đã chọn */}
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>
      {images.length === 0 && (
        <Text style={styles.warningText}>Vui lòng thêm ít nhất 1 ảnh</Text>
      )}

      {/* Nút Tiếp tục */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          { backgroundColor: isFormValid ? "#B77F2E" : "#ccc" },
        ]}
        disabled={!isFormValid}
        onPress={() => {
          //@ts-ignore
          navigation.navigate("RepairReview", {
            property,
            description,
            images,
          });
        }}
      >
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  warningText: { color: "red", fontSize: 12, marginBottom: 10 },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#B77F2E",
    borderRadius: 8,
    justifyContent: "center",
  },
  imageContainer: { flexDirection: "row", marginTop: 10, flexWrap: "wrap" },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  continueButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default RepairInsideScreen;
