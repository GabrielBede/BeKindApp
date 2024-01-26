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
import * as ImagePicker from "expo-image-picker";
import CardEventosSem from "../../components/CardEventosSem";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { KeyboardAvoidingView } from "react-native";

// const statusBarHeight = StatusBar.currentHeight;
const { width } = Dimensions.get("window");

export default function CriarEvento() {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.ScrollView}>
          <Text style={[styles.H3, { marginBottom: -10 }]}>Criar Evento</Text>

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
              Titulo Evento:
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
                placeholder="Frase Introdutória"
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Texto Resumo:
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
                placeholder="Breve resumo sobre o evento"
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <View>
            <Text style={[styles.H3, { marginTop: 40, marginBottom: 0 }]}>
              Local:
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
                placeholder="Local onde acontecerá o evento"
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
                placeholderTextColor="#7E7E7E"
              />
            </View>
          </View>

          <TouchableOpacity style={styles.Botao}>
            <Text
              style={{
                fontSize: 15,
                color: "#fff",
                fontFamily: "Montserrat-Bold",
                alignSelf: "center",
              }}
            >
              Criar Evento
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
    shadowColor: "#444444",
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

  Botao: {
    marginHorizontal: 30,
    backgroundColor: "#007CE0",
    borderRadius: 8,
    padding: 13,
    marginTop: 10,
    marginBottom: 50,
    textAlign: "center",
    shadowColor: "#444444",
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
