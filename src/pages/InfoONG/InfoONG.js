import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import Progresso from "../../components/ProgressBar";
import { useNavigation } from "@react-navigation/native";

export default function InfoONG({ route }) {
  const navigation = useNavigation();
  const { cardItem, imageUrl, titulo, usuario, meta, descricao, tipoDoacao, handleProfilePress   } =
    route.params;

  const [botaoativado, setBotaoativado] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        {/*Imagem principal*/}
        <View style={styles.Card}>
          <Image style={styles.ImageCard} source={{ uri: imageUrl }} />
          <View style={styles.Info}></View>
        </View>

        <View style={styles.Slogan}>
          <Text style={styles.H3}>{titulo}</Text>
        </View>

        {/*Usuário do Blog*/}
        <TouchableOpacity onPress={(handleProfilePress)}>
          <View style={styles.PerfilBlog}>
            <View style={styles.imgContainer}>
              <Image style={styles.PostPerfil} source={{ uri: usuario.fotoPerfil }} />
            </View>
            <Text style={styles.PostUser}>{usuario.nome}</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.H3Progresso}>
          <Text style={styles.H3}>Progresso</Text>
        </View>

        {/*Progresso e informações de metas da ONG*/}
        <View style={styles.Progresso}>
          <View style={styles.InfoProgresso}>
            <Text style={styles.PBoldBlack}>750 doações</Text>

            <View style={styles.Dias}>
              <Feather name="clock" size={20} color={"#7E7E7E"} />
              <Text style={styles.PBoldGray}>7 dias</Text>
            </View>
          </View>
          {/*Progresso e informações de metas da ONG*/}
          <Progresso />

          <View style={styles.InfoProgresso}>
            <Text style={styles.PBoldBlue}>R$1900</Text>
            <Text style={styles.PBlack}>Meta: {meta}</Text>
          </View>
        </View>

        <View style={styles.Descricao}>
          <Text style={styles.H3}>Sobre</Text>
          <Text style={styles.PBlack}>{descricao}</Text>
        </View>
        <View style={styles.Descricao}>
          <Text style={styles.H3}>Forma de Doação</Text>
          <Text style={styles.PBlack}>
            Atenção esse Card de doação foi criado única e exclusivamente na
            forma{" "}
            <Text style={{ color: "#252525", fontFamily: "Montserrat-Bold" }}>
              {tipoDoacao.toUpperCase()}
            </Text>
            , de modo que você deverá realizar a doação diretamento no APP!
          </Text>
        </View>

        <View style={styles.Descricao}>
          <Text style={styles.H3}>Contato</Text>

          <View style={styles.Contato}>
            <Feather
              style={styles.Icon}
              name="phone"
              size={20}
              color={"#007CE0"}
            />
            <Text style={styles.PBlack}>(11) 99999-9999</Text>
          </View>

          <View style={styles.Contato}>
            <Feather
              style={styles.Icon}
              name="at-sign"
              size={20}
              color={"#007CE0"}
            />
            <Text style={styles.PBlack}>oi@spinvisivel.org</Text>
          </View>

          <View style={styles.Contato}>
            <Feather
              style={styles.Icon}
              name="instagram"
              size={20}
              color={"#007CE0"}
            />
            <Text style={styles.PBlack}>@spinvisivel</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("DoarDinheiro")}>
          <Text style={styles.Botao}>Doar</Text>
        </TouchableOpacity>
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

  ImageCard: {
    width: "100%",
    height: 325,
  },

  H3: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#252525",
    marginBottom: 5,
  },

  PBlack: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },

  PBoldBlack: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#000",
  },

  PBoldGray: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#7E7E7E",
    marginLeft: 5,
  },

  PBoldBlue: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#007CE0",
  },

  Slogan: {
    marginHorizontal: 30,
    marginTop: 30,
  },

  PerfilBlog: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 30,
    alignContent: "center",
  },

  imgContainer: {
    width: 32,
    height: 32,
    
  },

  PostPerfil: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    borderRadius: 50

  },

  PostUser: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    color: "#252525",
    fontSize: 14,
    marginLeft: 8,
  },

  H3Progresso: {
    flexDirection: "column",
    marginHorizontal: 30,
    marginTop: 35,
  },

  InfoProgresso: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },

  Dias: {
    flexDirection: "row",
  },

  Progresso: {
    marginTop: 10,
    marginHorizontal: 30,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#7E7E7E",
    padding: 15,
  },

  Descricao: {
    marginHorizontal: 30,
    marginTop: 45,
  },

  Contato: {
    flexDirection: "row",
    marginVertical: 5,
  },

  Icon: {
    marginRight: 10,
  },

  Botao: {
    backgroundColor: "black",
    borderRadius: 8,
    padding: 13,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    marginTop: 15,
    textAlign: "center",
    marginHorizontal: 30,
    marginVertical: 45,
  },
});
