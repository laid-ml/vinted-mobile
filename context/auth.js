import { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthComp = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setTokenAndId = async (token, id) => {
    if (token && id) {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", id);
    } else {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userId");
    }

    setUserToken(token);
    setUserId(id);
  };

  useEffect(() => {
    const getDataFromAsync = async () => {
      const AsyncUserToken = await AsyncStorage.getItem("userToken");
      const AsyncUserId = await AsyncStorage.getItem("userId");

      console.log("getDataFromAsync : ", AsyncUserToken, AsyncUserId);

      setUserToken(AsyncUserToken);
      setUserId(AsyncUserId);
    };

    getDataFromAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ userToken, userId, setTokenAndId }}>
      {children}
    </AuthContext.Provider>
  );
};
