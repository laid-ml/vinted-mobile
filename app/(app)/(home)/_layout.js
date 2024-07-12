import { Stack } from "expo-router";

export default Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="offre" options={{ headerShown: false }} />
    </Stack>
  );
};
