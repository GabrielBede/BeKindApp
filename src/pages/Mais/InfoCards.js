import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardEventosSem from "../../components/CardEventosSem";
import { Feather } from "@expo/vector-icons";
import Progresso from "../../components/ProgressBarCards";
import { useState } from "react";
import * as Animatable from "react-native-animatable";
import { KeyboardAvoidingView } from "react-native";

// const statusBarHeight = StatusBar.currentHeight;
const { width } = Dimensions.get("window");

export default function InfoCards() {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState("");
  const filterOptions = ["Eventos", "Cards", "Ativos", "Inativos"];
  const [selectedFilter, setSelectedFilter] = useState("");
  const [originalCardList, setOriginalCardList] = useState([
    {
      nome: "O frio mais intenso é...",
      tipodoacao: "Monetário",
      status: "Ativo",
      data: "15.11.23",
      daysLeft: "3d",
      progresso: 0.75,
      tipoCard: "Card",
    },
    {
      nome: "Inverno Invisível",
      tipodoacao: "Roupas",
      status: "Ativo",
      data: "14.11.23",
      daysLeft: "1d",
      progresso: 0.5,
      tipoCard: "Evento",
    },
    {
      nome: "Combate à fome...",
      tipodoacao: "Alimento",
      status: "Inativo",
      data: "10.11.23",
      daysLeft: "0d",
      progresso: 0.25,
      tipoCard: "Evento",
    },
    {
      nome: "O frio mais intenso é...",
      tipodoacao: "Monetário",
      status: "Ativo",
      data: "15.11.23",
      daysLeft: "3d",
      progresso: 0.75,
      tipoCard: "Card",
    },
    {
      nome: "Inverno Invisível",
      tipodoacao: "Roupas",
      status: "Ativo",
      data: "14.11.23",
      daysLeft: "1d",
      progresso: 0.5,
      tipoCard: "Evento",
    },
    {
      nome: "Combate à fome...",
      tipodoacao: "Alimento",
      status: "Inativo",
      data: "10.11.23",
      daysLeft: "0d",
      progresso: 0.25,
      tipoCard: "Evento",
    },
    // Adicione mais objetos conforme necessário
  ]);

  const [filteredCardList, setFilteredCardList] = useState(originalCardList);

  const filterCards = (text, filter) => {
    const lowercasedText = text.toLowerCase();
    const lowercasedFilter = filter.toLowerCase();

    const filteredCards = originalCardList.filter((card) => {
      const lowercasedNome = card.nome.toLowerCase();
      const lowercasedTipoDoacao = card.tipodoacao.toLowerCase();

      return (
        lowercasedNome.includes(lowercasedText) &&
        (lowercasedFilter === "" ||
          card.tipoCard.toLowerCase() === lowercasedFilter)
      );
    });

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

  // Step 2: Add state variables
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);

  // Step 3: Create functions to handle button clicks
  const handlePlusButtonClick = () => {
    setShowAdditionalButtons(!showAdditionalButtons);
    setBlurBackground(!blurBackground);

    // Adicione lógica para animar os botões adicionais
    if (!showAdditionalButtons) {
      setButton1Visible(true);
      setButton2Visible(true);
    } else {
      setButton1Visible(false);
      setButton2Visible(false);
    }
  };

  const [button1Visible, setButton1Visible] = useState(false);
  const [button2Visible, setButton2Visible] = useState(false);

  // ...

  const handleDeleteCard = (cardToDelete) => {
    // Lógica para excluir o card do estado originalCardList
    const updatedCardList = originalCardList.filter(
      (card) => card !== cardToDelete
    );

    // Atualize o estado originalCardList
    setOriginalCardList(updatedCardList);

    // Atualize o estado filteredCardList se desejar manter a filtragem
    setFilteredCardList(updatedCardList);
  };

  // Atualize a função handlePlusButtonClick para controlar a visibilidade dos botões adicionais

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.ScrollView}>
          <View style={styles.InputArea}>
            <Feather
              style={styles.InputIcon}
              name="search"
              size={22}
              color={"#7E7E7E"}
            />
            <TextInput
              style={styles.Input}
              placeholder="Pesquisar Titulo/Doação"
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

          <Text style={styles.H3}>Suas Criações</Text>

          {/*Card - Eventos de Hoje*/}
          {filteredCardList.map((card, index) => (
            <View key={index} style={[styles.Card]}>
              <View style={styles.InnerCard}>
                <View style={styles.CardText}>
                  <View
                    style={[
                      styles.P1,
                      card.tipoCard === "Evento"
                        ? { backgroundColor: "black" }
                        : {},
                    ]}
                  >
                    <View
                      style={{
                        height: "100%",
                        justifyContent: "center",
                        marginHorizontal: 22,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Montserrat-Medium",
                          color: "white",
                        }}
                      >
                        {card.status}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Montserrat-Bold",
                          color: "white",
                          fontSize: 18,
                          marginBottom: 35,
                        }}
                      >
                        {card.nome}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "Montserrat-Medium",
                          color: "white",
                        }}
                      >
                        {card.data}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.P2}>
                    <View
                      style={{ height: "100%", width: "50%", marginTop: 20 }}
                    >
                      <Text
                        style={{
                          fontFamily: "Montserrat-Medium",
                          color: card.tipodoacao === "Card" ? "white" : "black",
                          marginLeft: "-50%",
                        }}
                      >
                        {card.tipoCard}
                      </Text>
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "Montserrat-Bold",
                          color: card.tipodoacao === "Card" ? "white" : "black",
                          marginLeft: "-50%",
                        }}
                      >
                        {card.tipodoacao}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        height: "100%",
                        marginTop: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          height: "100%",
                          justifyContent: "space-between",
                        }}
                      >
                        {/*
                          <Progresso
                          style={{
                            marginTop: 3,
                            marginRight: 15,
                            borderRadius: 5,
                          }}
                          progress={card.progresso}
                          color={card.tipoCard === "Card" ? "#007CE0" : "black"}
                        />                        */}

                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            right:10,
                          }}
                        >
                          <Feather
                            style={{ right: 3 }}
                            name="clock"
                            size={13}
                            color={"#7E7E7E"}
                          />
                          <Text style={styles.TextProgresso}>
                            {card.daysLeft}
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        style={[
                          styles.StatusButton,
                          card.tipoCard === "Evento"
                            ? { backgroundColor: "black" }
                            : {},
                        ]}
                        onPress={() =>
                          navigation.navigate(
                            card.tipoCard === "Card"
                              ? "EditarCard"
                              : "EditarEvento"
                          )
                        }
                      >
                        <Text style={styles.StatusButtonText}>
                          {card.status === "Inativo" ? "Visualizar" : "Editar"}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        width:40,
                        height:40,
                        top: 10,
                        alignItems:'center',
                        justifyContent:'center',
                        right: 10,
                        backgroundColor: "transparent", // ou outra cor de fundo desejada
                        borderRadius: 25,
                        padding: 5,
                        backgroundColor: card.tipoCard === "Card" ? "#007AFF" : "black",
                      }}
                      onPress={() => handleDeleteCard(card)}
                    >
                      <Feather name="trash-2" size={22} color="white"  />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.additionalButtons}>
          <TouchableOpacity onPress={() => navigation.navigate("CriarCard")}>
            {button1Visible && (
              <Animatable.View
                animation={showAdditionalButtons ? "fadeIn" : "fadeOut"}
                duration={500}
                style={styles.botaoAdicional1}
              >
                {/* Conteúdo do Botão 1 */}
                <Feather name="tag" size={24} color="white" />
              </Animatable.View>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("CriarEvento")}>
            {button2Visible && (
              <Animatable.View
                animation={showAdditionalButtons ? "fadeIn" : "fadeOut"}
                duration={500}
                style={styles.botaoAdicional2}
              >
                {/* Conteúdo do Botão 2 */}
                <Feather name="calendar" size={24} color="#fff" />
              </Animatable.View>
            )}
          </TouchableOpacity>
        </View>

        {blurBackground && <View style={styles.blurBackground} />}

        {/* Botão Plus*/}
        <TouchableOpacity
          style={styles.roundButton}
          onPress={handlePlusButtonClick}
        >
          <Feather name="grid" size={24} color="white" />
        </TouchableOpacity>
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

  Progresso: {
    flex: 1,
    width: 70,
    marginLeft: -15,
  },

  InputArea: {
    marginTop: 10,
    flex: 1,
    marginHorizontal: 20,
    borderColor: "#7E7E7E",
    borderRadius: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#444444",
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
    paddingTop: 15,
    paddingRight: 10,
    paddingBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 0,
    backgroundColor: "#fff",
    color: "#424242",
    fontFamily: "Montserrat-Regular",
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

  TextProgresso: {
    fontSize:13,
    fontFamily: "Montserrat-Medium",
  },

  StatusButton: {
    justifyContent:'center',
    backgroundColor: "#007ce0",
    width: 100,
    height: 35,
    marginBottom: 35,
    marginLeft: -40,
    borderRadius: 25, // Borda arredondada
    paddingVertical: 5, // Espaçamento vertical dentro do botão
    paddingHorizontal: 10, // Espaçamento horizontal dentro do botão
  },
  StatusButtonText: {
    alignSelf: "center",
    color: "white", // Cor do texto do botão (pode personalizar)
    fontFamily: "Montserrat-Bold",
    fontSize: 13,
  },

  PerfilONGtext: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginLeft: 5,
  },

  PerfilONGimage: {
    alignSelf: "center",
    width: 22,
    resizeMode: "contain",
  },

  PerfilONG: {
    flexDirection: "row",
    marginLeft: 44,
    marginTop: -58,
    marginBottom: 15,
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
    marginTop: 30,
    marginBottom: 15,
    fontSize: 20,
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

  Card: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "white",
    width: "90%",
    borderRadius: 25,
    resizeMode: "contain",
    marginBottom: 30,
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 8,
  },

  InnerCard: {
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
  },

  InnerText: {
    marginLeft: 45,
    marginTop: -80,
    width: 270,
  },

  CardText: {
    flex: 1,
    flexDirection: "row",
    height: 150,
  },

  P1: {
    flex: 1,
    backgroundColor: "#007ce0",
    marginRight: "15%",
    height: "100%",
  },

  P2: {
    flex: 1,
    flexDirection: "row",
  },

  ScrollView: {
    marginBottom: 60,
  },

  FilterBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },

  FilterButton: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  FilterButtonText: {
    color: "#7E7E7E",
  },

  SelectedFilter: {
    backgroundColor: "#007AFF",
  },

  SelectedFilterText: {
    color: "#fff",
  },

  roundButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF", // Cor do botão
    borderRadius: 30, // Metade da largura e altura para torná-lo redondo
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 8,
  },

  additionalButtons: {
    position: "absolute",
    bottom: 100,
    right: 20,
    flexDirection: "row",
  },

  botaoAdicional1: {
    top: 60,
    left: 10,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  botaoAdicional2: {
    backgroundColor: "#007AFF",
    borderRadius: 30,
    width: 60,
    height: 60,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,

    deleteButton: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "transparent", // ou outra cor de fundo desejada
      borderRadius: 15,
      padding: 5,
    },
  },
});
