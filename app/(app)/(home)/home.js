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

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data.offers);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <SafeAreaView>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            horizontal={false}
            numColumns={2}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={{ width: "48%", marginBottom: 50 }}>
                  <Pressable
                    onPress={() => {
                      router.navigate({
                        pathname: "/offre",
                        params: { id: item._id },
                      });
                    }}
                  >
                    <ScrollView horizontal={true}>
                      {item.owner.account.avatar ? (
                        <Image
                          style={{
                            height: 50,
                            width: "30%",
                            borderRadius: "100%",
                          }}
                          source={{
                            uri: item.owner.account.avatar.secure_url,
                          }}
                        />
                      ) : null}
                      <Text style={{ width: "50%", marginRight: 10 }}>
                        {item.owner.account.username}
                      </Text>
                    </ScrollView>

                    <Image
                      style={{ height: 300, width: "90%" }}
                      source={{
                        uri: item.product_pictures[0].secure_url,
                      }}
                    />
                    <Text>{item.product_price}</Text>
                    <Text>{item.product_name}</Text>
                    <Text>{item.product_details[0].MARQUE}</Text>
                  </Pressable>
                </View>
              );
            }}
            keyExtractor={(item) => {
              return String(item._id);
            }}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
