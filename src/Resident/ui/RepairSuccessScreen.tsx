import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { RootStackParamList } from "../../types";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";


  type Props = NativeStackScreenProps<RootStackParamList, "RepairSuccess">;
  const RepairSuccessScreen: React.FC<Props> = ({ navigation  }) => {
    React.useEffect(() => {
        const timer = setTimeout(() => {
          navigation.reset({
            routes: [{ name: "MainApp" }],
          });
        }, 5000);
        return () => clearTimeout(timer);
      }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/congratulation.png")} 
        style={styles.image}
      />
      <Text style={styles.text}>Yêu cầu của bạn đã được gửi thành công!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  image: { width: 250, height: 250, marginBottom: 20 },
  text: { fontSize: 18, fontWeight: "bold", textAlign: "center", paddingHorizontal: 20 },
});

export default RepairSuccessScreen;
