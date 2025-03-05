import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const RepairInsideScreen = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [floorModalVisible, setFloorModalVisible] = useState(false);
  const [roomModalVisible, setRoomModalVisible] = useState(false);

  // Danh sách tầng và phòng
  const floors = [1, 2, 3];
  const rooms: Record<number, string[]> = {
    1: ["1.1", "1.2", "1.3"],
    2: ["2.1", "2.2", "2.3"],
    3: ["3.1", "3.2", "3.3"],
  };

  // Chọn ảnh
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Yêu cầu sửa chữa</Text>
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

      {/* Chọn tầng */}
      <Text style={styles.label}>Chọn tầng</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setFloorModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedFloor ? `Tầng ${selectedFloor}` : "Chọn tầng"}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#333" />
      </TouchableOpacity>

      {/* Danh sách tầng */}
      <Modal visible={floorModalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setFloorModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {floors.map((floor) => (
              <TouchableOpacity
                key={floor}
                style={styles.modalItem}
                onPress={() => {
                  setSelectedFloor(floor);
                  setSelectedRoom(null); // Reset phòng khi đổi tầng
                  setFloorModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>Tầng {floor}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Chọn số phòng - Hiện khi đã chọn tầng */}
      {selectedFloor !== null && (
        <>
          <Text style={styles.label}>Chọn số phòng</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setRoomModalVisible(true)}
          >
            <Text style={styles.dropdownText}>
              {selectedRoom ? `Phòng ${selectedRoom}` : "Chọn phòng"}
            </Text>
            <Icon name="arrow-drop-down" size={24} color="#333" />
          </TouchableOpacity>

          {/* Danh sách phòng */}
          <Modal visible={roomModalVisible} transparent animationType="fade">
            <TouchableOpacity
              style={styles.modalOverlay}
              onPress={() => setRoomModalVisible(false)}
            >
              <View style={styles.modalContent}>
                {rooms[selectedFloor].map((room) => (
                  <TouchableOpacity
                    key={room}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedRoom(room);
                      setRoomModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalText}>{room}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      )}

      {/* Thêm hình ảnh */}
      <Text style={styles.label}>Thêm hình ảnh</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Icon name="add-a-photo" size={30} color="#B77F2E" />
        <Text>Chọn ảnh</Text>
      </TouchableOpacity>

      {/* Hiển thị ảnh đã chọn */}
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </View>

      {/* Nút Tiếp tục */}
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  backButton: { padding: 10, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
  label: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#B77F2E",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  dropdownText: { fontSize: 16, color: "#333" },
  modalOverlay: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#FFF", borderRadius: 10, margin: 20, padding: 10 },
  modalItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  modalText: { fontSize: 16 },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#B77F2E",
    borderRadius: 8,
    justifyContent: "center",
  },
  imageContainer: { flexDirection: "row", marginTop: 10 },
  image: { width: 80, height: 80, borderRadius: 8, marginRight: 10 },
  continueButton: {
    marginTop: 20,
    backgroundColor: "#B77F2E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
});

export default RepairInsideScreen;
