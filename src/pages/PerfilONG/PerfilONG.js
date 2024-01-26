import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export default function PerfilONG() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params;
  const [botaoativado, setBotaoativado] = useState(false);

  const handleMessages = () => {
    navigation.navigate("Mensagens");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.Informacoes}>
          <Image style={styles.PerfilONG} source={{ uri: userData.avatar }} />
          <Text style={styles.H3}>{userData.nomeUsuario}</Text>
          <Text style={styles.Text}>
            Organização não governamental (ONG){"\n"}Seja um doador mensal e
            ajude a causa{"\n"}das pessoas em situação de rua!
          </Text>
        </View>

        <View style={styles.Margin}>
          <View style={styles.Botoes}>
            <TouchableOpacity onPress={() => setBotaoativado(!botaoativado)}>
              <Text
                style={[
                  styles.Botao,
                  { backgroundColor: botaoativado ? "#7E7E7E" : "#007CE0" },
                ]}
              >
                {botaoativado ? "Seguindo" : "Seguir"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("InfoONG")}>
              <Text style={styles.Botao}>Doar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleMessages}>
              <Feather
                style={styles.BotaoIcon}
                name="message-square"
                size={22}
                color={"#252525"}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.AllPosts}>
          <Text style={styles.H3}>Posts</Text>
          <View style={styles.Posts}></View>
        </View>
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

  Informacoes: {
    alignItems: "center",
    margin: 35
  },

  PerfilONG: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
    alignSelf: "center",
  },

  H3: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: '#252525'
  },

  Text: {
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
    color: '#444444'
  },

  Botoes: {
    flexDirection: "row",
    justifyContent: "center",
  },

  Botao: {
    textAlign: "center",
    borderRadius: 5,
    width: 150,
    paddingVertical: 10,
    marginHorizontal: 5,
    fontSize: 13,
    fontFamily: "Montserrat-Bold",
    backgroundColor: "#007CE0",
    color: "#FFF",
  },

  BotaoIcon: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    backgroundColor: "#EEEEEE",
  },

  Post: {
    width: 110,
    height: 120,
    resizeMode: "contain",
    marginLeft: 10,
  },

  AllPosts: {
    flex: 1,
    justifyContent: "center",
    margin: 25,
  },

  Posts: {
    justifyContent: "center",
    flexDirection: "row",
  },
});
