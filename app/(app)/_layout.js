import { Tabs } from "expo-router";

export default AppLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ headerShown: false }} />
      {/* <Tabs.Screen name="recherche" /> */}
      <Tabs.Screen name="vendre" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
};
