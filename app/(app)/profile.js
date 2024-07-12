import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";

export default function ProfileScreen() {
  const { setTokenAndId } = useContext(AuthContext);

  return (
    <View>
      <Text>Ceci est un composant React Native !</Text>
      <Button
        title="log out"
        onPress={() => {
          setTokenAndId(null, null);
        }}
      />
    </View>
  );
}
