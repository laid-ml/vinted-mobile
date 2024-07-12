//app/index.js
import {
  View,
  Text,
  SafeAreaView,
  Title,
  Pressable,
  StyleSheet,
  Platform,
  TextInput,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useState } from "react";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export default function HomePage() {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.img}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "bold" }}>Vends sans frais</Text>
        <Pressable style={styles.button} onPress={() => router.push("/login")}>
          <Text style={{ color: "white" }}>login</Text>
        </Pressable>
        <Pressable
          style={styles.button2}
          onPress={() => {
            router.push("/signup");
          }}
        >
          <Text style={{ color: "#09B1BA" }}>signup</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "white",
  },
  img: {
    height: 100,
    width: 100,
  },
  button: {
    backgroundColor: "#09B1BA",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  button2: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#09B1BA",
    borderWidth: 3,

    height: 50,
  },
});
