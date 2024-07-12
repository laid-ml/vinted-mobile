import {
  View,
  Text,
  Button,
  SafeAreaView,
  Pressable,
  TextInput,
} from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const { userToken, userId } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("0");
  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getPermissionAndGetPicture = async () => {
    //Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //Ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };
  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //Ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
      }
    } else {
      alert("Permission refusée");
    }
  };
  const handleSubmit = async () => {
    const tab = selectedPicture.split(".");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", place);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", {
        uri: selectedPicture,
        name: `my-pic.${tab[tab.length - 1]}`,
        type: `image/${tab[tab.length - 1]}`,
      });

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.navigate({
        pathname: "/offre",
        params: { id: response.data._id },
      });

      //   console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <SafeAreaView>
        <Button
          title="Acccéder à la galerie photo"
          onPress={getPermissionAndGetPicture}
        />

        <Button
          title="Accéder à l'appareil photo"
          onPress={getPermissionAndTakePicture}
        />

        <TextInput
          placeholder="Titre"
          value={title}
          onChange={(text) => {
            setTitle(text);
          }}
        />
        <TextInput
          placeholder="décris ton article"
          value={description}
          onChange={(text) => {
            setDescription(text);
          }}
        />
        <TextInput
          placeholder="Marque"
          value={brand}
          onChange={(text) => {
            setBrand(text);
          }}
        />
        <TextInput
          placeholder="taille"
          value={size}
          onChange={(text) => {
            setSize(text);
          }}
        />
        <TextInput
          placeholder="couleur"
          value={color}
          onChange={(text) => {
            setColor(text);
          }}
        />
        <TextInput
          placeholder="ETAT"
          value={condition}
          onChange={(text) => {
            setCondition(text);
          }}
        />
        <TextInput
          placeholder="prix"
          value={price}
          onChange={(text) => {
            setPrice(text);
          }}
        />
        <TextInput
          placeholder="emplacement"
          value={place}
          onChange={(text) => {
            setPlace(text);
          }}
        />
        <Pressable
          style={{
            backgroundColor: "#09B1BA",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white" }}>ajouter ce produit</Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
