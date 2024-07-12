import { Slot, router } from "expo-router";
import { AuthComp, AuthContext } from "../context/auth";
import { useContext, useEffect } from "react";

export default RootLayout = () => {
  return (
    <AuthComp>
      <SlotProvider />
    </AuthComp>
  );
};

const SlotProvider = () => {
  const { userToken, userId } = useContext(AuthContext);

  useEffect(() => {
    if (!userId && !userToken) {
      router.replace("/");
    }
    if (userId && userToken) {
      router.replace("/home");
    }
  }, [userToken, userId]);

  return <Slot />;
};
