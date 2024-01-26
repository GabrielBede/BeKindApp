import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  View,
} from "react-native";

import { FIREBASE_AUTH } from "../../utils/firebase/FirebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const auth = FIREBASE_AUTH;

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email); 
      setIsEmailSent(true);
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha", error);
    }
    if(!email){
      alert('Insira um email válido.')
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      enabled
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.Fundo}>
          <View style={styles.container}>
            <View style={styles.Margin}>
              {/* Logo - BeKind */}
              <Image
                style={styles.Logo}
                source={require("../../img/LogoCompleta.png")}
              />

              {/* Login */}
              <Text
                style={{
                  fontFamily: "Montserrat-Bold",
                  fontSize: 24,
                  color: "#252525",
                  marginTop: 40,
                }}
              >
                Problemas para entrar?
              </Text>
              <Text style={{ marginTop: 10, color: "#252525", fontFamily:'Montserrat-Medium', }}>
                Por favor, forneça o seu endereço de email e enviaremos um link para ajudá-lo a recuperar o acesso
                à sua conta.
              </Text>
              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="user"
                  size={23}
                  color={"#7E7E7E"}
                />
                <TextInput
                  style={styles.Input}
                  placeholderTextColor="#7E7E7E"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View>
                <TouchableOpacity
                  style={styles.Botao}
                  onPress={handlePasswordReset}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#fff",
                      fontFamily: "Montserrat-Bold",
                      alignSelf: "center",
                    }}
                    value={""}
                  >
                    {" "}
                    Enviar link
                  </Text>
                </TouchableOpacity>
                {isEmailSent && (
                  alert('E-mail de redefinição de senha enviado com sucesso!')
                )}
              </View>
              <TouchableOpacity
                style={{ marginTop: 15, alignSelf: "center" }}
                onPress={() => navigation.navigate("Cadastro")}
              >
                <Text style={styles.Paragrafo}>
                  <Text
                    style={{
                      color: "#7E7E7E",
                      fontFamily: "Montserrat-Medium",
                    }}
                  >
                    Não possui cadastro?
                  </Text>{" "}
                  <Text style={styles.Entre}>Conecte-se! </Text>{" "}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  width: "70%",
                  height: 1,
                  backgroundColor: "#EEEEEE",
                  marginTop: 30,
                  alignSelf: "center",
                }}
              />
            </View>
            <TouchableOpacity
              style={{ marginTop: 60, alignSelf: "center" }}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.Paragrafo}>
                <Text
                  style={{
                    color: "#7E7E7E",
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Voltar ao login
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  Fundo: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  Margin: {
    marginHorizontal: 30,
  },

  Logo: {
    width: 130,
    height: 130,
    resizeMode: "contain",
    marginTop: 40,
  },

  InputArea: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 20,
    borderRadius: 8,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    marginTop: 40,
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
    backgroundColor: "#252525",
    borderRadius: 8,
    padding: 13,
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginTop: 30,
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

  Paragrafo: {
    fontFamily: "Montserrat-Regular",
    fontSize: 15,
    color: "#252525",
    marginTop: 15,
    textAlign: "right",
  },

  Entre: {
    fontFamily: "Montserrat-Bold",
    color: "#007CE0",
  },
});
