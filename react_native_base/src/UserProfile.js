import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Image,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Btn from "./Btn";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoadingOtp, setIsLoadingOtp] = useState(false);
  const [jwt, setJwt] = useState(null);

  // Check if JWT exists when app opens
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        setJwt(token);
        navigation.replace("Welcome");
      }
    };
    checkLogin();
  }, []);

  // --- API Calls ---
  const signupOrLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }

    try {
      setIsLoadingOtp(true); // show "please wait" modal

      const res = await fetch(`http://travelitry-app-env.eba-muk2mpsw.ap-south-1.elasticbeanstalk.com/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("📦 Signup response:", data);

      setIsLoadingOtp(false); // stop loading

      if (res.ok) {
        setIsModalVisible(true); // open OTP modal
      } else {
        Alert.alert("Error", data.message || "Signup/Login failed");
      }
    } catch (err) {
      setIsLoadingOtp(false);
      Alert.alert("Error", err.message);
    }
  };

  const verifyEmailOtp = async () => {
    if (!otp) {
      Alert.alert("Error", "Enter verification code first");
      return;
    }
    try {
      const res = await fetch(`http://travelitry-app-env.eba-muk2mpsw.ap-south-1.elasticbeanstalk.com/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      console.log("📦 Verify response:", data);

      if (res.ok) {
        await AsyncStorage.setItem("jwt", data.token);
        setJwt(data.token);
        setIsModalVisible(false);
        navigation.replace("Welcome");
      } else {
        Alert.alert("Invalid Code", data.message || "Verification failed");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <StatusBar backgroundColor="#a75bfe" barStyle="light-content" />

        {/* Purple Top */}
        <View style={styles.topHalf}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImage} source={require("./assets/travel.png")} />
            <Text style={styles.brand}>TravelITR</Text>
          </View>
        </View>

        {/* White Bottom */}
        <View style={styles.bottomHalf}>
          <Text style={styles.title}>Signup / Login</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="grey"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="grey"
            secureTextEntry
            onChangeText={setPassword}
          />

          <Btn
            bgColor="#a75bfe"
            textColor="white"
            btnLabel="Signup / Login"
            Press={signupOrLogin}
          />
        </View>

        {/* Loading Modal */}
        <Modal visible={isLoadingOtp} transparent animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <ActivityIndicator size="large" color="#a75bfe" />
              <Text style={{ marginTop: 10, fontSize: 16 }}>
                Hang tight, we’re sending a verification code to your email.
              </Text>
            </View>
          </View>
        </Modal>

        {/* Email OTP Modal */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Verify Your Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Verification Code"
                placeholderTextColor="grey"
                keyboardType="number-pad"
                onChangeText={setOtp}
              />
              <Btn
                bgColor="#a75bfe"
                textColor="white"
                btnLabel="Verify"
                Press={verifyEmailOtp}
              />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  topHalf: {
    flex: 1,
    backgroundColor: "#a75bfe",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  brand: { color: "white", fontSize: 32, fontWeight: "bold" },
  bottomHalf: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600", marginBottom: 20, color: "#333" },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  logoContainer: { alignItems: "center", justifyContent: "center", marginBottom: 10 },
  logoImage: { width: 120, height: 120, marginRight: 10 },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
});
