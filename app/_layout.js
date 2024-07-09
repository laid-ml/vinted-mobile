import { Stack } from "expo-router";
import logo from "../assets/logo.png";
import { Image } from "react-native";

const Layout = () => {
  const LogoTitle = () => {
    return (
      <Image
        source={require("../assets/logo.png")}
        style={{ height: 50, width: 50, marginRight: 300 }}
        resizeMode="contain"
      />
    );
  };
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
        }}
      />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  );
};

export default Layout;
