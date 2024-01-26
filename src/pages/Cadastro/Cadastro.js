import React, { useState, useContext } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { AuthenticationContext } from "../../services/authentication/authentication.context";

export default function Cadastro({ navigation }) {
  const { onRegister, error, loading, setLoading } = useContext(AuthenticationContext);  

  const [username, setUsername] = useState("");
  const [cpf, setCPF] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  var [Senha, setSenha] = useState("");
  var [Olho, setOlho] = useState(true);

  const [voluntarioPressionado, setVoluntarioPressionado] = useState(false);
  const [ongPressionado, setOngPressionado] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState("voluntario");
  const [placeholder, setPlaceholder] = useState("CPF");

  function Cadastro() {
    alert("Cadastro realizado com sucesso!");
  }

  function VoluntarioPress() {
    setVoluntarioPressionado(!voluntarioPressionado);
    setOngPressionado(false);
    setTipoUsuario("voluntario");
    setPlaceholder("CNPJ");
  }

  function OngPress() {
    setOngPressionado(!ongPressionado);
    setVoluntarioPressionado(false);
    setTipoUsuario("ong");
    setPlaceholder("CPF");
  }

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

              {/* Botões de ação -> Voluntário e ONG */}
              <View style={styles.Login}>
                {/* Botões de ação -> Voluntário */}
                <TouchableOpacity
                  style={[
                    styles.Selecao1,
                    voluntarioPressionado && {
                      backgroundColor: "#fff",
                      borderColor: "#252525",
                    },
                  ]}
                  onPress={OngPress}
                >
                  <Text
                    style={{
                      ...styles.PBold,
                      color: voluntarioPressionado ? "#252525" : "#fff",
                    }}
                  >
                    {" "}
                    Voluntário{" "}
                  </Text>
                </TouchableOpacity>

                {/* Botões de ação -> ONG */}
                <TouchableOpacity
                  style={[
                    styles.Selecao2,
                    voluntarioPressionado && {
                      backgroundColor: "#252525",
                      borderColor: "#252525",
                    },
                  ]}
                  onPress={VoluntarioPress}
                >
                  <Text
                    style={{
                      ...styles.PBold,
                      color: voluntarioPressionado ? "#fff" : "#252525",
                    }}
                  >
                    {" "}
                    ONG{" "}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cadastro */}
              <Text style={styles.Text}>Cadastro</Text>

              {/* Input - Nome  do Usuário */}
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
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                  placeholder="Nome do Usuário"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - CPF e CNPJ */}
              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="file-text"
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
                  value={cpf}
                  onChangeText={(text) => setCPF(text)}
                  placeholder={placeholder}
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - Email */}
              <View style={styles.InputArea}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="mail"
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
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Email"
                  placeholderTextColor="#7E7E7E"
                />
              </View>

              {/* Input - Senha */}
              <View style={styles.InputAreaSenha}>
                <Feather
                  style={styles.IconsOpcoes}
                  name="lock"
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
                  placeholder="Senha"
                  placeholderTextColor="#7E7E7E"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={Olho}
                />

                <TouchableOpacity onPress={() => setOlho(!Olho)}>
                  <Feather
                    style={styles.IconeOlho}
                    name={Olho ? "eye-off" : "eye"}
                    color="#7E7E7E"
                    size={23}
                  />
                </TouchableOpacity>
              </View>

              {/* Botão - Cadastrar */}
              <TouchableOpacity
                style={[
                  styles.Botao,
                  cadastroSucesso ? styles.BotaoSucesso : null,
                ]}
                onPress={() => onRegister(username, cpf, email, password)}
                disabled={loading}
              >
                {!loading ? (
                  cadastroSucesso ? (
                    <Feather
                      name="check"
                      size={20}
                      color="#fff"
                      style={{ alignSelf: "center" }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: 15,
                        color: "#fff",
                        fontFamily: "Montserrat-Bold",
                        alignSelf: "center",
                      }}
                    >
                      Cadastrar
                    </Text>
                  )
                ) : (
                  <ActivityIndicator color="#fff" size={20} />
                )}
              </TouchableOpacity>

              {/* Botão - Fazer Login */}
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.Paragrafo}>
                  {" "}
                  <Text>Já possui login?</Text>{" "}
                  <Text style={styles.Entre}>Entre!</Text>{" "}
                </Text>
              </TouchableOpacity>
            </View>
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
    marginTop: 15,
  },

  Text: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    color: "#252525",
    marginTop: 40,
  },

  PBold: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#fff",
    padding: 5,
    textAlign: "center",
  },

  InputArea: {
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

  InputAreaSenha: {
    paddingLeft: 20,
    flexDirection: "row",
    padding: 9,
    borderRadius: 10,
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
    marginTop: 20,
    color: "#252525",
    borderColor: "#7E7E7E",
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

  IconeOlho: {
    marginLeft: -20,
  },

  Input: {
    width: "85%",
    color: "#252525",
    fontFamily: "Montserrat-Regular",
    outline: "none",
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

  BotaoSucesso: {
    marginHorizontal: 30,
    backgroundColor: "#007CE0",
    borderRadius: 8,
    padding: 13,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 15,
    marginTop: 30,
    textAlign: "center",
    shadowColor: "444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  Login: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 25,
  },

  Selecao1: {
    display: "flex",
    backgroundColor: "#252525",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    width: "50%",
    borderColor: "#252525",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: "none",
    borderRightColor: "#252525",
    shadowColor: "#444444",
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },

  Selecao2: {
    display: "flex",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    color: "#fff",
    fontFamily: "Montserrat-Regular",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    width: "50%",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderLeftColor: "#252525",
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
    color: "#7E7E7E",
    marginTop: 15,
    textAlign: "right",
  },

  Entre: {
    fontFamily: "Montserrat-Bold",
    color: "#007CE0",
  },
});
