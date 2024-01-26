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

export default function InfoEventos() {
  const [botaoativado, setBotaoativado] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <View style={styles.Card}>
          <Image
            style={styles.ImageCard}
            source={require("../../img/EventoSPInvisivel2.png")}
          />
          <View style={[styles.TextOverlay, { alignItems: "flex-start" }]}>
            <Text style={styles.H2}>Natal Invisível</Text>
            <Text style={styles.PWhite}>
              Santa Ifigênia, São Paulo - SP, Brasil
            </Text>
          </View>
        </View>

        {/*Usuário do Blog*/}
        <TouchableOpacity>
          <View style={styles.PerfilBlog}>
            <Image
              style={styles.PostPerfil}
              source={require("../../img/PerfilSPInvisivel.png")}
            />
            <Text style={styles.PostUser}>SP Invisível</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.Descricao}>
          <Text style={{ fontFamily: "Montserrat-Bold" }}>
            <Text style={{ color: "#252525" }}>110</Text>{" "}
            <Text style={styles.PBlack}>Participantes</Text>
          </Text>
          <Image
            style={styles.Participantes}
            source={require("../../img/EventosParticipantes.png")}
          />
          <Text style={styles.H3}>Descrição do Evento:</Text>
          <Text style={styles.PBlack}>
            O Papai Noel existe? Essa questão passa pela cabeça de muitas
            crianças pelo mundo e os pais fazem de tudo para que a magia do
            natal não acabe! Para quem vive em situação de rua essa magia já se
            apagou a muito tempo...“Meu Papai Noel não vem, com certeza já
            morreu...”Esse é o Oitavo ano que nós da SP Invisível realizamos o
            Natal Invisível, levando o espirito natalino e muita comida de
            qualidade para as ruas! Esse ano você pode fazer parte disso!
          </Text>
        </View>

        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => setBotaoativado(!botaoativado)}
        >
          <Text
            style={[
              styles.Botao,
              { backgroundColor: botaoativado ? "#7E7E7E" : "#000" },
            ]}
          >
            {botaoativado ? "Cancelar participação" : "Participar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  ImageCard: {
    width: "100%",
    height: 325,
  },

  TextOverlay: {
    position: "absolute",
    top: 240, // Ajuste conforme necessário para posicionar os textos dentro da imagem
    left: 30, // Ajuste conforme necessário para posicionar os textos dentro da imagem
    width: "100%",
    alignItems: "center",
  },

  H2: {
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 25,
  },

  PWhite: {
    marginTop: 10,
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },

  H3: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#252525",
  },

  PBlack: {
    marginTop: 20,
    color: "#000",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },

  PerfilBlog: {
    flexDirection: "row",
    marginLeft: 30,
    marginTop: -45,
  },

  PostPerfil: {
    alignSelf: "center",
    width: 33,
    resizeMode: "contain",
  },

  PostUser: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    marginLeft: 8,
    color: "#252525",
  },

  Participantes: {
    width: "100%",
    height: 90,
    resizeMode: "contain",
  },

  Descricao: {
    width: 360,
    marginLeft: 30,
    marginTop: -40,
  },

  Botao: {
    marginBottom: 50,
    backgroundColor: "black",
    borderRadius: 8,
    padding: 13,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    marginTop: 15,
    textAlign: "center",
    marginHorizontal: 30,
  },
});
