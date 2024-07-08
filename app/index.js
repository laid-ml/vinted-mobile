//app/index.js
import {
  View,
  Text,
  KeyboardAwareScrollView,
  SafeAreaView,
  Title,
  Button,
  StyleSheet,
  Platform,
} from "react-native";

export default function HomePage() {
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
    >
      <SafeAreaView style={styles.mainView}></SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  mainView: {
    paddingTop: Platform.OS === "android" && Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
  },
});
