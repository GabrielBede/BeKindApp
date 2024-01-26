import React, { useContext, useState } from "react";
import { useEffect } from "react";

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CardONGTeste from "../../components/CardONGTeste";

import { FIREBASE_FIRESTORE } from "../../utils/firebase/FirebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export default function Doacoes({ cardId }) {
  const { userAuth } = useContext(AuthenticationContext);

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const [searchText, setSearchText] = useState("");
  const filterOptions = [
    "Alimento",
    "Roupas",
    "Dinheiro",
    "Moradia",
    "Utensílios",
    "Voluntário",
  ];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredCardList, setFilteredCardList] = useState();

  const db = FIREBASE_FIRESTORE;
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cards"), (snapshot) => {
      const cardsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardsData);
    });

    return () => unsubscribe();
  }, [db]);

  const handleCardPress = (item) => {
    navigation.navigate("InfoONG", {
      imageUrl: item.imageUrl,
      titulo: item.titulo,
      usuario: item.usuario,
      meta: item.meta,
      descricao: item.descricao,
      tipoDoacao: item.tipoDoacao,
      handleProfilePress: () => handleProfilePress(item),
    });
  };

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

  const filterCards = (text, filter) => {
    const filteredCards = cards.filter(
      (card) =>
        card.usuario.nome.toLowerCase().includes(text.toLowerCase()) &&
        (filter === "" ||
          (card.tipoDoacao &&
            card.tipoDoacao.toLowerCase() === filter.toLowerCase()))
    );
    setFilteredCardList(filteredCards);
    setSearchText(text);
    setSelectedFilter(filter);
  };

  const toggleFilter = (filter) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
      filterCards(searchText, ""); // Limpar o filtro
    } else {
      setSelectedFilter(filter);
      filterCards(searchText, filter);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    const unsubscribe = onSnapshot(collection(db, "cards"), (snapshot) => {
      const cardsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCards(cardsData);
      filterCards(searchText, selectedFilter);
      setRefreshing(false);
    });

    return () => unsubscribe();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.ScrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007CE0"
          />
        }
      >
        <Text style={styles.H3}>Doações</Text>

        <View style={styles.InputArea}>
          <Feather
            style={styles.InputIcon}
            name="search"
            size={22}
            color={"#7E7E7E"}
          />
          <TextInput
            style={styles.Input}
            placeholder="Pesquisar ONG/Doação"
            placeholderTextColor="#7E7E7E"
            onChangeText={(text) => filterCards(text, selectedFilter)}
            value={searchText}
            underlineColorAndroid="transparent"
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.FilterBar}
        >
          {filterOptions.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.FilterButton,
                selectedFilter === filter && styles.SelectedFilter,
              ]}
              onPress={() => toggleFilter(filter)}
            >
              <Text
                style={[
                  styles.FilterButtonText,
                  selectedFilter === filter && styles.SelectedFilterText,
                  { fontFamily: "Montserrat-Medium" }, // Adicione esta linha para definir a fonte
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* {filteredCardList.map((card, index) => (
        ))} */}

        <FlatList
          data={filteredCardList || cards}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardONGTeste
              nomeUsuario={item.usuario.nome}
              imgPerfil={item.usuario.fotoPerfil}
              imgBg={item.imageUrl}
              meta={item.meta}
              titulo={item.titulo}
              onDonatePress={() => handleCardPress(item)}
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
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 20,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#252525",
  },

  InputArea: {
    flex: 1,
    marginHorizontal: 30,
    padding: 3,
    borderColor: "#7E7E7E",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#AAAAAA",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 4,
  },

  InputIcon: {
    padding: 10,
  },

  Input: {
    flex: 0.9,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    fontFamily: "Montserrat-Regular",
  },

  ScrollView: {
    marginBottom: 60,
  },

  FilterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    marginTop: 10,
    paddingRight: 40,
    marginBottom: 20,
  },

  FilterButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  SelectedFilter: {
    backgroundColor: "#007AFF",
  },

  FilterButtonText: {
    color: "#7E7E7E",
  },

  SelectedFilterText: {
    color: "#fff",
  },
});
