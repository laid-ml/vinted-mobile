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
import axios from "axios";
import Constants from "expo-constants";

import { useState } from "react";
import { router } from "expo-router";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

const Login = () => {
  const { setTokenAndId } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      if (response.data.token && response.data._id) {
        setTokenAndId(response.data.token, response.data._id);
      } else {
        console.log("error setting token and id");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
        <TextInput
          placeholder="email"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
          style={{ width: "90%" }}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
          style={{ width: "90%" }}
        />
        {/* <Button text={"Sign in"} onPressFun={handleSubmit} /> */}

        <Pressable style={styles.button} onPress={handleSubmit}>
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

export default Login;
