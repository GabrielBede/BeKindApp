import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { Feather } from "@expo/vector-icons";
import {
  FIREBASE_FIRESTORE,
  FIREBASE_STORAGE,
} from "../../utils/firebase/FirebaseConfig";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { useContext } from "react";
import { Alert } from "react-native";
import { DataContext } from "../../services/data/data.context";

export default function CriarCard() {
  const { userData } = useContext(DataContext);
  const { userAuth } = useContext(AuthenticationContext);


  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [titulo, setTitulo] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [meta, setMeta] = useState(null);
  const [tipoDoacao, setTipoDoacao] = useState("Alimento"); // Valor padrão
  const [card, setCard] = useState([]); 

  const db = FIREBASE_FIRESTORE;
  const storage = FIREBASE_STORAGE;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cards"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          setCard((prevFiles) => [...prevFiles, change.doc.data()]);
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

  async function uploadImage(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "CardImages/" + new Date().getTime());
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

  async function saveRecord(fileType, url) {
    try {
      const docRef = await addDoc(collection(db, "cards"), {
        titulo,
        descricao,
        meta,
        tipoDoacao,
        fileType,
        imageUrl: String(url), 
        dataCriacao: new Date(),
        userId: userAuth.uid,
        usuario: {
          nome: userData.nomeUsuario,
          fotoPerfil: userData.avatar,
        },
        favoritos: null,
      });

      setImage(null);
      setTitulo("");
      setMeta("");
      setDescricao("");

      Alert.alert("Card criado com sucesso!");
      console.log("Card criado com sucesso!", docRef.id);
    } catch (error) {
      console.error("Erro ao criar o card:", error.message);
      Alert.alert("Erro ao criar o card. Tente novamente mais tarde.");
    }
  }

  const handleCreateCard = async () => {
    if (!image) {
      Alert.alert("Selecione uma imagem primeiro");
      return;
    }

    try {
      const downloadURL = await uploadImage(image, "image");
      await saveRecord("image", downloadURL);
    } catch (error) {
      console.error("Erro ao criar o card:", error.message);
      Alert.alert("Erro ao criar o card. Tente novamente mais tarde.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.ScrollView}>
          <Text style={[styles.H3, { marginBottom: -10 }]}>Criar Card</Text>

          <View style={{ alignSelf: "center", marginTop: 35 }}>
            <TouchableOpacity style={styles.botao} onPress={pickImage}>
              <Image
                source={image ? { uri: image } : require("../../img/Grey.png")}
                style={styles.imagemBotao}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Titulo Card:
            </Text>

            <View style={styles.InputArea}>
              <Feather
                style={styles.IconsOpcoes}
                name="user"
                size={23}
                color={"#7E7E7E"}
              />
              <TextInput
                style={{
                  width: "85%",
                  color: "#252525",
                  fontFamily: "Montserrat-Regular",
                  outline: "none",
                }}
                placeholder="Inserir título"
                value={titulo}
                onChangeText={(text) => setTitulo(text)}
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Tipo de Doação:
            </Text>

            <View style={styles.InputAreaPicker}>
              <Feather
                style={styles.IconsOpcoes}
                name="user"
                size={23}
                color={"#7E7E7E"}
              />
              <Picker
                selectedValue={tipoDoacao}
                style={{ width: "85%" }}
                onValueChange={(itemValue) => setTipoDoacao(itemValue)}
              >
                {[
                  "Alimento",
                  "Roupas",
                  "Dinheiro",
                  "Moradia",
                  "Utensílios",
                  "Voluntário",
                ].map((item) => (
                  <Picker.Item label={item} value={item} key={item} />
                ))}
              </Picker>
            </View>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Meta:
            </Text>

            <View style={styles.InputArea}>
              <Feather
                style={styles.IconsOpcoes}
                name="user"
                size={23}
                color={"#7E7E7E"}
              />
              <TextInput
                style={{
                  width: "85%",
                  color: "#252525",
                  fontFamily: "Montserrat-Regular",
                  outline: "none",
                }}
                placeholder="Quantidade Unitária"
                value={meta}
                onChangeText={(text) => setMeta(text)}
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Sobre:
            </Text>

            <View style={[styles.InputArea, { marginBottom: 20 }]}>
              <Feather
                style={styles.IconsOpcoes}
                name="user"
                size={23}
                color={"#7E7E7E"}
              />
              <TextInput
                style={{
                  width: "85%",
                  color: "#252525",
                  fontFamily: "Montserrat-Regular",
                  outline: "none",
                }}
                placeholder="Descrição do Card"
                value={descricao}
                onChangeText={(text) => setDescricao(text)}
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.Botao} onPress={handleCreateCard}>
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontFamily: "Montserrat-Bold",
                alignSelf: "center",
              }}
            >
              Criar Card
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === 'android' ? statusBarHeight : 25,
  },

  Header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -65,
    marginBottom: -60,
    alignSelf: "center",
    alignItems: "center",
  },

  H3: {
    marginLeft: 30,
    marginTop: 30,
    marginBottom: 15,
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
  },

  H3Black: {
    color: "black",
    fontSize: 21,
    marginBottom: 5,
    fontFamily: "Montserrat-Bold",
  },

  Text: {
    color: "#000",
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
  },

  ScrollView: {
    marginBottom: 60,
  },

  picker: {
    width: 340,
    height: 340,
    borderRadius: 25,
    backgroundColor: "#7E7E7E",
    borderWidth: 2,
    borderColor: "#7E7E7E",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#B4B4B4",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 8,
  },

  imgIcon: {
    position: "absolute",
    left: 65,
    bottom: 50,
    width: 50,
    height: 50,
    backgroundColor: "#007CE0",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  imagemBotao: {
    position: "absolute",

    width: 340,
    height: 340,
    borderRadius: 20,
  },

  InputArea: {
    marginHorizontal: 30,
    flexDirection: "row",
    padding: 8,
    paddingLeft: 20,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    marginTop: 20,
    color: "#252525",
    alignItems: "center",
    shadowColor: "#252525",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  InputAreaPicker: {
    marginHorizontal: 30,
    flexDirection: "row",
    height: 45,
    paddingLeft: 20,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    marginTop: 20,
    color: "#252525",

    alignItems: "center",
    shadowColor: "#252525",
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

  Botao: {
    marginHorizontal: 30,
    backgroundColor: "#007CE0",
    borderRadius: 8,
    marginBottom: 50,
    padding: 13,
    marginTop: 10,
    textAlign: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  botao: {
    width: 340,
    height: 340,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: "#7E7E7E",
    borderColor: "#7E7E7E",
    alignItems: "center",
    justifyContent: "center",
  },
});
