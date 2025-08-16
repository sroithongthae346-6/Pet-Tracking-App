import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase/firebase.js"; // ปรับเส้นทางให้ตรงกับที่เก็บไฟล์ firebase.js

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showForgotLink, setShowForgotLink] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown && cooldownTime > 0) {
      timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
    } else if (cooldownTime === 0) {
      setIsCooldown(false);
      setErrorMessage("");
    }
    return () => clearTimeout(timer);
  }, [isCooldown, cooldownTime]);

  const handleEmailLogin = async () => {
    if (isCooldown) return;

    const emailTrimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrimmed)) {
      setErrorMessage("รูปแบบอีเมลไม่ถูกต้อง");
      setShowForgotLink(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, emailTrimmed, password);
      setErrorMessage("");
      setShowForgotLink(false);

      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
        if (userDoc.exists()) {
          console.log(userDoc.data());
        } else {
          console.log("No such user document!");
        }
      }
    } catch (error: any) {
      console.error("Error code:", error.code);
      switch (error.code) {
        case "auth/wrong-password":
          setErrorMessage("รหัสผ่านไม่ถูกต้อง");
          setShowForgotLink(true);
          break;
        case "auth/user-not-found":
          setErrorMessage("ไม่พบบัญชีผู้ใช้นี้");
          break;
        case "auth/too-many-requests":
          setErrorMessage("กรุณารอ 30 วินาที แล้วลองใหม่");
          setIsCooldown(true);
          setCooldownTime(30);
          setShowForgotLink(true);
          break;
        case "auth/invalid-credential":
          setErrorMessage("ข้อมูลรับรองไม่ถูกต้อง");
          break;
        case "auth/network-request-failed":
          setErrorMessage("เกิดปัญหาการเชื่อมต่อเครือข่าย");
          break;
        default:
          setErrorMessage("เกิดข้อผิดพลาด: " + error.message);
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>เข้าสู่ระบบ</Text>

        <TextInput
          placeholder="Email Address"
          value={email}
          onChangeText={setEmail}
          editable={!isCooldown}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isCooldown}
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        {showForgotLink && (
          <Text style={styles.forgotLink}>
            ลืมรหัสผ่าน? เปลี่ยนรหัสผ่าน
          </Text>
        )}

        <TouchableOpacity
          onPress={handleEmailLogin}
          disabled={isCooldown}
          style={[styles.button, isCooldown && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {isCooldown ? `กรุณารอสักครู่ (${cooldownTime} วินาที)` : "LOGIN"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          ยังไม่มีบัญชีผู้ใช้? สมัครสมาชิก
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f3f3f3", padding: 16 },
  card: { width: "100%", maxWidth: 400, backgroundColor: "#fff", borderRadius: 16, padding: 24, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 4 }, shadowRadius: 6, elevation: 4 },
  title: { fontSize: 24, fontWeight: "bold", color: "#111", marginBottom: 16, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  error: { color: "red", fontSize: 14, marginBottom: 8 },
  forgotLink: { color: "#ffd900", textAlign: "right", marginBottom: 12 },
  button: { backgroundColor: "#ffd900", paddingVertical: 14, borderRadius: 8, marginTop: 8 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#111", fontWeight: "bold", textAlign: "center" },
  signupText: { textAlign: "center", color: "#555", marginTop: 16 },
});
