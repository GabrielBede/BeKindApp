import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  TextInput,
  Alert,
  Pressable,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import CardONG from "../../components/CardONG";
import CardONGTeste from "../../components/CardONGTeste";
import Post from "../../components/Post";

import * as ImagePicker from "expo-image-picker";

import { DataContext } from "../../services/data/data.context";
import { Modal } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { StatusBar } from "react-native";

import { Feather } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  FIREBASE_FIRESTORE,
  FIREBASE_STORAGE,
} from "../../utils/firebase/FirebaseConfig";
import { useEffect } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const { width } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const { userData } = useContext(DataContext);
  const { userAuth } = useContext(AuthenticationContext);

  const handleDonateNow = () => {
    navigation.navigate("InfoONG");
  };

  const handleLinkNow = () => {
    navigation.navigate("PerfilONG");
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
  const [progress, setProgress] = useState(0);
  const [legenda, setLegenda] = useState(null);

  const [post, setPost] = useState([]);

  const db = FIREBASE_FIRESTORE;
  const storage = FIREBASE_STORAGE;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setPost((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

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

  async function uploadImage(uri) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "PostImages/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is", progress + "% done");
          setProgress(progress.toFixed());
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log("Imagem disponível em", downloadURL);
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }

  async function saveRecord(url) {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        legenda,
        imageUrl: String(url), // Garante que url seja uma string
        dataCriacao: new Date(),
        userId: userAuth.uid,
        usuario: {
          nome: userData.nomeUsuario,
          fotoPerfil: userData.avatar,
        },
        curtidas: null,
      });

      setImage(null);
      setLegenda(null);

      Alert.alert("Post criado com sucesso!");
      console.log("Post criado com sucesso!", docRef.id);
    } catch (error) {
      console.error("Erro ao criar o Post:", error.message);
      Alert.alert("Erro ao criar o Post. Tente novamente mais tarde.");
    }
  }

  const handleCreatePost = async () => {
    if (!image) {
      Alert.alert("Selecione uma imagem primeiro");
      return;
    }

    try {
      const downloadURL = await uploadImage(image);
      await saveRecord(downloadURL);
    } catch (error) {
      console.error("Erro ao criar o post:", error.message);
      Alert.alert("Erro ao criar o post. Tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        {/* Apresentação do usuário */}
        <Text style={styles.H1}>
          <Text>Olá </Text>
          <Text style={{ fontFamily: "Montserrat-Bold", color: "#252525" }}>
            {userData.nomeUsuario},
          </Text>
        </Text>
        <Text style={styles.Text}>Seja gentil e doe para quem precisa.</Text>

        {/* Criação de Post*/}
        <Pressable
          onPress={openModal}
          style={({ pressed }) => [styles.InputArea, pressed && styles.pressed]}
        >
            <Text
              style={{
                fontFamily: "Montserrat-Medium",
                color: "#7E7E7E",
                right: 78,
              }}
            >
              Crie uma Publicação!
            </Text>
        </Pressable>

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
                    <Text style={{ fontFamily: "Montserrat-Medium" }}>
                      Crie uma nova publicação!
                    </Text>
                  </View>

                  <TouchableOpacity onPress={handleCreatePost}>
                    <View>
                      <View
                        style={{
                          borderRadius: 7,
                          width: 80,
                          height: 35,
                          backgroundColor: "#007CE0",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontFamily: "Montserrat-Bold",
                            fontSize: 11,
                            alignSelf: "center",
                          }}
                        >
                          PUBLICAR
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{}}>
                  <TouchableOpacity onPress={pickImage}>
                    <View style={{ width: "100%" }}>
                      <Image
                        source={
                          image
                            ? { uri: image }
                            : require("../../img/InsiraUmaImagem.png")
                        }
                        style={{
                          width: "100%",
                          height: 350,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={styles.InputArea2}>
                  <Feather
                    style={styles.IconsOpcoes}
                    name="align-left"
                    size={23}
                    color={"#7E7E7E"}
                  />
                  <TextInput
                    style={styles.Input}
                    placeholder={"Escreva uma legenda"}
                    placeholderTextColor="#7E7E7E"
                    onChangeText={(text) => setLegenda(text)}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {/* Barra de status cinza */}
          <StatusBar backgroundColor="white" barStyle="light-content" />
        </Modal>

        {/* Seta -> Doações */}
        <TouchableOpacity onPress={() => navigation.navigate("Doacoes")}>
          <View style={styles.Doacoes}>
            <Text style={styles.H3}>Doações</Text>
            <Image
              style={styles.Seta}
              source={require("../../img/SetaD.png")}
            />
          </View>
        </TouchableOpacity>

        {/* Card SPInvisivel */}
        <CardONG
          imgCardSource={require("../../img/BgONGSPInvisivel.png")}
          ongPerfilSource={require("../../img/PerfilSPInvisivel.png")}
          nome="SP Invisível"
          meta="Meta: R$7.000"
          descricao="O frio mais intenso é o da indiferença."
        />

        {/* Seta -> Eventos */}
        <TouchableOpacity onPress={() => navigation.navigate("Eventos")}>
          <View style={styles.Doacoes}>
            <Text style={styles.H3}>Eventos</Text>
            <Image
              style={styles.Seta}
              source={require("../../img/SetaD.png")}
            />
          </View>
        </TouchableOpacity>

        {/* Eventos */}
        <View>
          <FlatList
            style={{
              backgroundColor: "transparent",
              paddingLeft: 20,
              marginBottom: 20,
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0}
            snapToInterval={width - 100}
            snapToAlignment={"center"}
            data={[
              {
                image: require("../../img/SpStorie2.png"),
                text: "Natal Invisível",
                profileImage: require("../../img/PerfilSPInvisivel.png"),
                textWidth: "70%",
                link: "InfoEventos",
              },
              {
                image: require("../../img/AnjosStorie.png"),
                text: "Montagem de Cestas",
                profileImage: require("../../img/PerfilAnjosdaRua.png"),
                textWidth: "80%",
                link: "InfoEventos",
              },
              {
                image: require("../../img/StorieHigiene.png"),
                text: "Entrega de kits de higiene",
                profileImage: require("../../img/BemdaMadrugada.png"),
                textWidth: "90%",
                link: "InfoEventos",
              },
              {
                image: require("../../img/SpStorie.png"),
                text: "Eu sabia que você existia",
                profileImage: require("../../img/PerfilSPInvisivel.png"),
                textWidth: "70%",
                link: "InfoEventos",
              },
              {
                image: require("../../img/AnjosStorie.png"),
                text: "Arrecadação do mês de novembro",
                profileImage: require("../../img/PerfilAnjosdaRua.png"),
                textWidth: "80%",
                link: "InfoEventos",
              },
              {
                image: require("../../img/BemdaMadrugadaStorie.png"),
                text: "Entrega de kits de higiene",
                profileImage: require("../../img/BemdaMadrugada.png"),
                textWidth: "90%",
                link: "InfoEventos",
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
                <ImageBackground source={item.image} style={styles.BStorie}>
                  <Image
                    source={item.profileImage}
                    style={styles.ProfileImage}
                  />
                  <Image style={styles.IconCategorias} />
                  <Text
                    style={{ ...styles.TextCategorias, width: item.textWidth }}
                  >
                    {item.text}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Seta -> Blog */}

        <TouchableOpacity onPress={() => navigation.navigate("Blog")}>
          <View style={styles.Doacoes}>
            <Text style={styles.H3}>Blog</Text>
            <Image
              style={styles.Seta}
              source={require("../../img/SetaD.png")}
            />
          </View>
        </TouchableOpacity>

        {/* Post - SP Invisivel */}
        <Post
          LinkNav={handleLinkNow}
          ongPostSource={require("../../img/PostSPInvisivel.png")}
          ongPerfilSource={require("../../img/PerfilSPInvisivel.png")}
          nome="SP Invisível"
          descricao="Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis."
        />

        {/* Loja */}
        <View style={styles.Loja}>
          <Text style={styles.H3}>Loja</Text>
          <Image style={styles.Seta} source={require("../../img/SetaD.png")} />
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
          <TouchableOpacity>
            <View style={{ marginLeft: 30 }}>
              <Image
                style={styles.CardLoja}
                source={require("../../img/ECObag.png")}
              />
              <Text style={styles.TextLojaH1}>Sacola ECO</Text>
              <Text style={styles.TextLojaH2}>R$34,99</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              <Image
                style={styles.CardLoja}
                source={require("../../img/Caneca.png")}
              />
              <Text style={styles.TextLojaH1}>Caneca</Text>
              <Text style={styles.TextLojaH2}>R$24,99</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
          <TouchableOpacity>
            <View style={{ marginLeft: 30 }}>
              <Image
                style={styles.CardLoja}
                source={require("../../img/CamisetaBranca.png")}
              />
              <Text style={styles.TextLojaH1}>T-Shirt: Branca</Text>
              <Text style={styles.TextLojaH2}>R$34,99</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={{ marginLeft: 15 }}>
              <Image
                style={styles.CardLoja}
                source={require("../../img/CamisetaPreta.png")}
              />
              <Text style={styles.TextLojaH1}>T-Shirt: Preta</Text>
              <Text style={styles.TextLojaH2}>R$24,99</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  H1: {
    marginTop: 15,
    marginLeft: 30,
    fontSize: 20,
    fontFamily: "Montserrat-Regular",
  },

  H3: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#252525",
  },

  TextLojaH1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 17,
    color: "#000",
  },

  TextLojaH2: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    color: "#007CE0",
  },

  Text: {
    marginLeft: 30,
    fontSize: 14,
    width: 200,
    fontFamily: "Montserrat-Regular",
  },

  TextCategorias: {
    color: "white",
    width: "70%",
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginTop: 10,
    marginLeft: 10,
  },

  Doacoes: {
    marginRight: 30,
    alignItems: "center",
    marginBottom: 5,
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  Loja: {
    marginRight: 30,
    alignItems: "center",
    marginLeft: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  CardLoja: {
    width: 160,
    height: 200,
    resizeMode: "contain",
  },

  CategoriasView: {
    marginRight: 30,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 30,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  BlogView: {
    marginRight: 30,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  Seta: {
    width: 37,
    resizeMode: "contain",
  },

  ProfileImage: {
    width: 35,
    height: 35,
    position: "absolute",
    bottom: 10,
    left: 10,
    borderRadius: 20,
  },

  BStorie: {
    width: 132,
    height: 195,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 0,
    backgroundColor: "transparent",
    borderRadius: 15,
  },

  ScrollView: {
    marginBottom: 60,
  },

  InputArea: {
    backgroundColor: "white",
    marginTop: 13,
    marginBottom: 20,
    marginLeft: 30,
    width: "85%",
    height: 50,
    padding: 3,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 15,
    elevation: 3,
  },

  InputArea2: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 20,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    color: "#252525",
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

  IconsOpcoes: {
    marginRight: 10,
  },

  Input: {
    width: "85%",
    color: "#252525",
    fontFamily: "Montserrat-Regular",
  },

  InputIcon2: {
    alignSelf: "center",
  },

  Input: {
    flex: 0.9,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: "#fff",
    color: "#424242",
    fontFamily: "Montserrat-Regular",
  },

  pressed: {
    opacity: 0.8,
  },
});
