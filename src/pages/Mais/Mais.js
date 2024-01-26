import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Modalize } from "react-native-modalize";
import { Feather } from "@expo/vector-icons";
import { FIREBASE_FIRESTORE } from "../../utils/firebase/FirebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";
import { getAddress } from "./location";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InfoCards from "./InfoCards";
import { TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";

import { Modal } from "react-native";

export default function App() {
  const [mapRegion, setMapRegion] = useState({
    latitude: -23.4545815,
    longitude: -46.5425497,
    latitudeDelta: 0.03,
    longitudeDelta: 0.03,
  });

  const navigation = useNavigation();

  const [markers, setMarkers] = useState([]);
  const [markerTitle, setMarkerTitle] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const db = FIREBASE_FIRESTORE;

  const [isButtonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    // Verifica se a descrição tem pelo menos 150 caracteres
    const isDescriptionValid = description.trim().length >= 100;

    // Verifica se os campos de localização e descrição estão preenchidos
    const isFormValid = location.trim() !== "" && isDescriptionValid;

    setButtonEnabled(isFormValid);
  }, [location, description]);

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permitir acesso à localização");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });

    const userLocationMarker = {
      coordinate: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
      title: "Sua localização atual",
    };

    setUserLocation(userLocationMarker);

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const modalizeRef = useRef(null);

  const handleMapPress = (event) => {
    const newMarker = {
      coordinate: event.nativeEvent.coordinate,
      title: markerTitle || "Novo marcador",
    };
    setMarkers([...markers, newMarker]);
    setMarkerTitle("");
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });

    getAddress(lat, lng)
      .then((address) => {
        setLocation(address);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const cadastroVulneravel = async () => {
    setLoading(true);
    try {
      const usuariosRef = collection(db, "vulneravel");

      const nomeVulneravel = name;
      const sexo = gender;
      const qtd_pessoa = numPeople;
      const desc_pessoa = description;
      const localizacao = location;
      const createdAt = new Date();

      const newDocRef = doc(usuariosRef);

      await setDoc(newDocRef, {
        nomeVulneravel,
        sexo,
        qtd_pessoa,
        desc_pessoa,
        localizacao,
        createdAt,
      });

      setCadastroSucesso(true);
      alert("Vulnerável cadastrado com sucesso!");

      setTimeout(() => {
        setCadastroSucesso(false);
        setName("");
        setGender("");
        setNumPeople("");
        setDescription("");
        setLocation("");
      }, 2000);
    } catch (error) {
      console.log(error);
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePressOutside = () => {
    closeModal();
  };

  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const pinColor = "#007CE0";

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {userLocation && (
          <Marker
            coordinate={userLocation.coordinate}
            title={userLocation.title}
            pinColor={pinColor}
          />
        )}

        {selectedLocation && (
          <Marker
            pinColor="red"
            title="Localização escolhida"
            coordinate={{
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            }}
          />
        )}
      </MapView>

      <TouchableOpacity
        style={[styles.Botao, { backgroundColor: "#000" }]}
        onPress={openModal}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
            fontFamily: "Montserrat-Bold",
            alignSelf: "center",
          }}
          value={""}
        >
          {" "}
          Cadastrar vulnerável
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Botao}
        onPress={() => navigation.navigate("InfoCards")}
      >
        <Text
          style={{
            fontSize: 15,
            color: "#fff",
            fontFamily: "Montserrat-Bold",
            alignSelf: "center",
          }}
        >
          Cards e Eventos
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={handlePressOutside}>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                borderRadius: 25,
                width: 45,
                height: 8,
                backgroundColor: "#007CE0",
                alignSelf: "center",
                bottom: 5,
                shadowColor: "#007CE0",
                shadowOpacity: 0.1,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowRadius: 5,
                elevation: 5,
              }}
            ></View>

            {/* Fundo cinza semi-transparente */}
            <View
              style={{
                backgroundColor: "transparent",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
              }}
            />

            <View
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                width: "100%",
                height: "82%",
                ...Platform.select({
                  android: {
                    shadowColor: "#007CE0",
                    elevation: 50, // Adiciona sombra no Android
                  },
                  ios: {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                  },
                }),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 20,
                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={styles.H3}>Cadastrar vulnerável</Text>
                </View>
              </View>

              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="user"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={styles.Input}
                  placeholder="Nome"
                  placeholderTextColor="#7E7E7E"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>

              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="heart"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={styles.Input}
                  placeholder="Sexo"
                  placeholderTextColor="#7E7E7E"
                  value={gender}
                  onChangeText={(text) => setGender(text)}
                />
              </View>

              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="users"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={styles.Input}
                  placeholder="Quantidade de pessoas"
                  placeholderTextColor="#7E7E7E"
                  value={numPeople}
                  onChangeText={(text) => setNumPeople(text)}
                />
              </View>

              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="map-pin"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={styles.Input}
                  placeholder="Localização"
                  placeholderTextColor="#7E7E7E"
                  value={location}
                  onChangeText={(text) => setLocation(text)}
                />
                {location.trim() !== "" ? (
                  <Feather name="check-circle" size={20} color="green" />
                ) : (
                  <Feather name="info" size={21} color="red" />
                )}
              </View>

              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="align-left"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={[styles.Input, { multiline: true }]} // Add the multiline prop
                  placeholder="Descrição"
                  placeholderTextColor="#7E7E7E"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  multiline={true} // Set the multiline prop
                  numberOfLines={undefined} // Set the numberOfLines prop to undefined or a large number
                />
                <View>
                  {description.trim().length >= 100 ? (
                    <Feather name="check-circle" size={20} color="green" />
                  ) : (
                    <Feather name="info" size={21} color="red" />
                  )}
                </View>
              </View>
              <TouchableOpacity
              style={[
                styles.Botao,
                {
                  backgroundColor: isButtonEnabled
                    ? cadastroSucesso
                      ? "green" 
                      : "black" 
                    : "#7E7E7E", 
                },
              ]}
              onPress={cadastroVulneravel}
              disabled={!isButtonEnabled || loading}
            >
              {!loading ? (
                cadastroSucesso ? (
                  <Feather
                    name="check"
                    size={20}
                    color="#fff"
                    style={{ alignSelf: "center" }}
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center",
                    }}
                  >
                    Cadastrar
                  </Text>
                )
              ) : (
                <ActivityIndicator color="#fff" size={20} />
              )}
            </TouchableOpacity>

            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* Barra de status cinza */}
        <StatusBar backgroundColor="white" barStyle="light-content" />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  H3: {
    marginTop:20,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#000",
    marginLeft: 15,
  },

  map: {
    width: "100%",
    height: "65%",
  },

  Botao: {
    marginHorizontal: 30,
    backgroundColor: "#007CE0",
    borderRadius: 8,
    padding: 13,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  BotaoSucesso: {
    marginHorizontal: 30,
    backgroundColor: "#007CE0",
    borderRadius: 8,
    padding: 13,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  IconsOpcoes: {
    marginRight: 10,
  },

  InputArea: {
    width: "85%",
    alignSelf: "center",
    marginHorizontal: 30,
    flexDirection: "row",
    padding: 12,
    paddingLeft: 20,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "white",
    marginTop: 20,
    color: "black",
    alignItems: "center",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  Input: {
    width: "77%",
    marginRight: 10,
    alignSelf: "center",
    color: "black",
    fontFamily: "Montserrat-Regular",
    outline: "none",
  },
});
