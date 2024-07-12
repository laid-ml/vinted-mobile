import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Image,
} from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function RoomScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${id}`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",

        flex: 1,
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Image
            source={{ uri: data.product_image.secure_url }}
            style={{ height: "50%", width: "100%" }}
          />
          <View style={{ flexDirection: "row" }}>
            <Text>{data.owner.account.username}</Text>
            {data.owner.account.avatar ? (
              <Image
                source={{ uri: data.owner.account.avatar.secure_url }}
                style={{ height: 50, width: 50 }}
              />
            ) : null}
          </View>
          <View>
            <Text>{data.product_name}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            {data.product_details.map((detail, index) => {
              const keys = Object.keys(detail);

              const key = keys[0];

              return key === "MARQUE" || key === "TAILLE" || key === "ÉTAT" ? (
                <Text key={index}>
                  {key} {detail[key]}
                </Text>
              ) : null;
            })}
          </View>
          <View>
            <Text>{data.product_price}</Text>
          </View>
          <View>
            <Text>{data.product_description}</Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text>Favoris</Text>
            <Text>Partager</Text>
          </View>
          <View>
            <Pressable
              style={{
                backgroundColor: "#09B1BA",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                height: 50,
              }}
            >
              <Text style={{ color: "white" }}>envoyer un message</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "white",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#09B1BA",
                borderWidth: 3,

                height: 50,
              }}
            >
              <Text style={{ color: "#09B1BA" }}>acheter</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
