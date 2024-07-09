//app/index.js
import {
  View,
  Text,
  SafeAreaView,
  Title,
  Button,
  StyleSheet,
  Platform,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useState } from "react";
import { router } from "expo-router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.img}
          resizeMode="contain"
        />
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="username"
          secureTextEntry={true}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />

        <Pressable style={styles.button}>
          <Text style={{ color: "white" }}>se connecter</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  mainView: {
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
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
});

export default Signup;
