import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  FlatList,
} from "react-native";

import PostTESTE from "../../components/PostTESTE";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../utils/firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Blog() {
  const db = FIREBASE_FIRESTORE;
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const cardsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(cardsData);
    });

    return () => unsubscribe();
  }, [db]);

  const handleProfilePress = async (item) => {
    try {
      if (item.hasOwnProperty("userId")) {
        const userDoc = await getDoc(doc(db, "usuarios", item.userId));

        if (userDoc.exists()) {
          const userData = userDoc.data();

          navigation.navigate("PerfilONG", {
            userData,
          });
        } else {
          console.error("Documento do usuário não encontrado no Firestore.");
        }
      } else {
        console.error(
          "A propriedade 'userId' não foi encontrada no objeto 'item'."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>

        <Text style={styles.H3}>Blog</Text>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostTESTE
              nomeUsuario={item.usuario.nome}
              legenda={item.legenda}
              profilePic={item.usuario.fotoPerfil}
              postBg={item.imageUrl}
              onProfilePress={() => handleProfilePress(item)}
            />
          )}
        />
      </ScrollView>
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
    marginBottom: -20,
    alignSelf: "center",
    alignItems: "center",
  },

  Logo: {
    width: 30,
    resizeMode: "contain",
    alignSelf: "center",
  },

  Perfil: {
    width: 50,
    resizeMode: "contain",
    alignSelf: "center",
    marginRight: 25,
  },

  H3: {
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: '#252525'
  },
});
