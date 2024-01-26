import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  FIREBASE_AUTH,
  FIREBASE_FIRESTORE,
  FIREBASE_STORAGE,
} from "../../utils/firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useContext } from "react";
import { DataContext } from "../../services/data/data.context";
import { getDownloadURL, ref, put, uploadBytes } from "firebase/storage";

export default function EditarPerfil() {
  const { userData, updateUserData } = useContext(DataContext);

  const [image, setImage] = useState(null);

  const [newName, setNewName] = useState(userData.nomeUsuario || "");
  const [newEmail, setNewEmail] = useState(userData.email || "");
  const [newCPF, setNewCPF] = useState(userData.cpf || "");
  const [newCidade, setNewCidade] = useState(userData.cidade || "");
  const [newEstado, setNewEstado] = useState(userData.estado || "");
  const [newPais, setNewPais] = useState(userData.pais || "");

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_FIRESTORE;
  const storage = FIREBASE_STORAGE;

  const hasProfilePic =
    userData.avatar !== null &&
    userData.avatar !== undefined &&
    userData.avatar !== "";

    const handleUpdateUserData = async () => {
      const user = auth.currentUser;
    
      if (user) {
        try {
          let imageUrl = userData.avatar;
    
          // Upload da nova imagem, se houver
          if (image) {
            const storageRef = ref(storage, `avatars/${user.uid}`);
            const blob = await (await fetch(image)).blob();
            const result = await uploadBytes(storageRef, blob);
            imageUrl = await getDownloadURL(result.ref);
          }
    
          // Atualiza os dados do usuário no contexto
          updateUserData({
            nomeUsuario: newName,
            email: newEmail,
            cpf: newCPF,
            cidade: newCidade,
            estado: newEstado,
            pais: newPais,
            avatar: imageUrl,
          });
    
          // Atualiza os posts do usuário no Firestore
          const cardsQuery = query(collection(db, 'cards'), where('userId', '==', user.uid));
          const cardsSnapshot = await getDocs(cardsQuery);
    
          const batch = writeBatch(db);
    
          cardsSnapshot.forEach((cardDoc) => {
            const cardsRef = doc(db, 'cards', cardDoc.id);
            batch.update(cardsRef, {
              usuario: {
                nome: newName,
                fotoPerfil: imageUrl,
              },
            });
          });
    
          await batch.commit();
    
          console.log('Dados do usuário e posts atualizados com sucesso!');
          Alert.alert('Dados do usuário e posts atualizados com sucesso!');
        } catch (error) {
          console.error('Erro ao atualizar dados do usuário: ' + error.message);
        }
      }
    };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
          <View style={{ marginHorizontal: 30, marginTop: 15 }}>
            <Text style={styles.H3}>Perfil</Text>

            <View style={{ alignSelf: "center", marginTop: 35 }}>
              <TouchableOpacity style={styles.botao} onPress={pickImage}>
                {hasProfilePic ? (
                  <Image
                    style={styles.imagemBotao}
                    source={image ? { uri: image } : { uri: userData.avatar }}
                  />
                ) : (
                  <Image
                    style={styles.imagemBotao}
                    source={
                      image ? { uri: image } : require("../../img/Perfil.png")
                    }
                  />
                )}
                <View style={styles.imgIcon}>
                  <Image
                    source={require("../../img/imgIcon.png")}
                    style={{ width: "50%", height: "50%" }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Input - Nome */}
            <View style={{ marginTop: 25 }}>
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>Nome</Text>
                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newName}
                  onChangeText={(text) => setNewName(text)}
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - Email */}
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>Email</Text>

                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newEmail}
                  onChangeText={(text) => setNewEmail(text)}
                  placeholder="oi@spinvisivel.org"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - Cidade */}
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>CPF</Text>

                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newCPF}
                  onChangeText={(text) => setNewCPF(text)}
                  placeholder="37.499.064/0001-99"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - CPF & CNPJ */}
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>Cidade</Text>

                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newCidade}
                  onChangeText={(text) => setNewCidade(text)}
                  placeholder="Cidade"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - Estado */}
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>Estado</Text>

                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newEstado}
                  onChangeText={(text) => setNewEstado(text)}
                  placeholder="Estado"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - País */}
              <View style={styles.InputArea}>
                <Text style={styles.InputTitulo}>País</Text>

                <TextInput
                  style={{
                    width: "100%",
                    backgroundColor: "#E3F2FD",
                    fontFamily: "Montserrat-Regular",
                    outline: "none",
                    height: 38,
                    paddingHorizontal: 10,
                  }}
                  value={newPais}
                  onChangeText={(text) => setNewPais(text)}
                  placeholder="País"
                  placeholderTextColor="#7E7E7E"
                />
              </View>
              <TouchableOpacity
                style={styles.Atualizar}
                onPress={handleUpdateUserData}
              >
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 13,
                    fontFamily: "Montserrat-Bold",
                    color: "white",
                    alignSelf: "center",
                    alignItems: "center",
                  }}
                >
                  Atualizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  H3: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },

  botao: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#007CE0",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 50,
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
    width: 95,
    height: 95,
    borderRadius: 50,
  },

  InputArea: {
    flexDirection: "column",
    padding: 8,
    paddingLeft: 2,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    color: "#E3F2FD",
  },

  InputTitulo: {
    alignSelf: "flex-start",
    fontFamily: "Montserrat-Bold",
  },

  Atualizar: {
    backgroundColor: "#007CE0",
    width: 130,
    height: 37,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 15,
    marginBottom: 15,
  },
});
