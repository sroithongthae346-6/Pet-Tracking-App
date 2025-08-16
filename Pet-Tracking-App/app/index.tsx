import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router"; // ใช้ Link ของ Expo Router
import { StyleSheet } from "react-native"; // นำเข้า StyleSheet สำหรับการจัดรูปแบบ

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/01.png")} style={styles.dogImg} />
      
      <Text style={styles.title}>Hey! Welcome</Text>
      <Text style={styles.subtitle}>While You Sit And Stay - We’ll Go Out And Play</Text>
      
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  dogImg: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#FF6347", // สีปุ่ม
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
