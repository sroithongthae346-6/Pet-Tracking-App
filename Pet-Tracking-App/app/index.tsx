import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router"; // ใช้ Link ของ Expo Router
import styles from "./styles.js"; // ไฟล์ StyleSheet

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/image/01.png")} style={styles.dogImg} />
      
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
