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
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CardEventosSem from "../../components/CardEventosSem";

export default function Eventos() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.ScrollView}>
        <Text style={styles.H3}>Eventos de Hoje</Text>

        {/*Card - Eventos de Hoje*/}
        <View style={styles.Card}>
          <TouchableOpacity onPress={() => navigation.navigate("InfoEventos")}>
            <View style={styles.InnerCard}>
              <ImageBackground
                style={styles.ImageCard}
                source={require("../../img/EventoSPInvisivel2.png")}
              >
                <View>
                  {/*Card - Descrição do evento*/}
                  <View style={styles.CardText}>
                    <View style={styles.PerfilONG}>
                      <Image
                        style={styles.PerfilONGimage}
                        source={require("../../img/PerfilSPInvisivel.png")}
                      />
                      <Text style={styles.PerfilONGtext}>SP Invisível</Text>
                    </View>

                    <View style={styles.InnerText}>
                      <Text style={styles.H3Black}>Natal Invisível</Text>
                      <Text style={styles.Text}>
                        Ao invés de entregar coisas velhas e usadas, combatemos
                        o frio das ruas através do resgate da dignidade.
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.H3}>Eventos da Semana</Text>

        {/*1. Card - Eventos da semana*/}
        <TouchableOpacity>
          <CardEventosSem
            ongPerfilSource={require("../../img/MontagemCestas.png")}
            nome="Entrega de cestas"
            data="Mai. 1, 2023"
          />
        </TouchableOpacity>

        {/*2. Card - Eventos da semana*/}
        <TouchableOpacity>
          <CardEventosSem
            ongPerfilSource={require("../../img/KitsHigiene.png")}
            nome="Sopa solidária"
            data="Mai. 3, 2023"
          />
        </TouchableOpacity>

        {/*3. Card - Eventos da semana*/}
        <TouchableOpacity>
          <CardEventosSem
            ongPerfilSource={require("../../img/Ruas.png")}
            nome="Existe gentileza em SP"
            data="Mai. 4, 2023"
          />
        </TouchableOpacity>

        {/*4. Card - Eventos da semana*/}
        <TouchableOpacity>
          <CardEventosSem
            ongPerfilSource={require("../../img/10anos.png")}
            nome="Entrega de cestas"
            data="Ago. 11, 2023"
          />
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

  Header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -65,
    marginBottom: -60,
    alignSelf: "center",
    alignItems: "center",
  },

  PerfilONGtext: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginLeft: 5,
    color: "#252525",

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
    marginTop: 15,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#252525",
  },

  H3Black: {
    color: "#171717",
    fontSize: 21,
    marginBottom: 5,
    fontFamily: "Montserrat-Bold",
  },

  Text: {
    color: "#3E3E3E",
    fontSize: 13,
    fontFamily: "Montserrat-Medium",
  },

  Card: {
    display: "flex",
    alignSelf: "center",
    backgroundColor: "white",
    width: "85%",
    borderRadius: 25,
    resizeMode: "contain",
    marginBottom: 60,
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
    borderRadius: 25,
    overflow: "hidden",
    width: "100%",
  },

  ImageCard: {
    width: "100%",
  },

  InnerText: {
    marginLeft: 45,
    marginTop: -80,
    width: 270,
  },

  CardText: {
    flexDirection: "column",
    height: 170,
    backgroundColor: "white",
    resizeMode: "contain",
    marginTop: "60%",
  },

  ScrollView: {
    marginBottom: 60,
  },
});
