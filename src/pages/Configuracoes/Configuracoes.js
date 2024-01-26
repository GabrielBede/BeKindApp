import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { Feather } from "@expo/vector-icons";

export default function Configuracoes({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.H3}>Perfil</Text>
      <Text
        style={{
          marginTop: 15,
          marginLeft: 30,
          marginBottom: 15,
          fontSize: 16,
          fontFamily: "Montserrat-Bold",
        }}
      >
        Interações
      </Text>

      {/*Informações do usuário*/}

      {/*Botão Editar - Informações do usuário*/}

      {/*Campos de configurações*/}
      <View style={styles.CamposContainer}>
        <View style={styles.Campos}>
          <TouchableOpacity style={styles.Componentes}>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Feather
                style={styles.IconsOpcoes}
                name="heart"
                size={25}
                color={"#252525"}
              />
              <Text style={styles.OpcoesText}>Curtidas</Text>
            </View>
            <Feather
              style={styles.Seta}
              name="chevron-right"
              size={25}
              color={"#252525"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.Campos}>
          <TouchableOpacity
            style={styles.Componentes}
            onPress={() => navigation.navigate("Notificacoes")}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Feather
                style={styles.IconsOpcoes}
                name="star"
                size={25}
                color={"#252525"}
              />
              <Text style={styles.OpcoesText}>Favoritos</Text>
            </View>
            <Feather
              style={styles.Seta}
              name="chevron-right"
              size={25}
              color={"#252525"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.Campos}>
          <TouchableOpacity
            style={styles.Componentes}
            onPress={() => navigation.navigate("Premiacoes")}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Feather
                style={styles.IconsOpcoes}
                name="smile"
                size={25}
                color={"#252525"}
              />
              <Text style={styles.OpcoesText}>Eventos</Text>
            </View>
            <Feather
              style={styles.Seta}
              name="chevron-right"
              size={25}
              color={"#252525"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Campos}>
          <TouchableOpacity
            style={styles.Componentes}
            onPress={() => navigation.navigate("Premiacoes")}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Feather
                style={styles.IconsOpcoes}
                name="package"
                size={25}
                color={"#252525"}
              />
              <Text style={styles.OpcoesText}>Histórico de doações</Text>
            </View>
            <Feather
              style={styles.Seta}
              name="chevron-right"
              size={25}
              color={"#252525"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Campos}>
          <TouchableOpacity
            style={styles.Componentes}
            onPress={() => navigation.navigate("Premiacoes")}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
              }}
            >
              <Feather
                style={styles.IconsOpcoes}
                name="user-plus"
                size={25}
                color={"#252525"}
              />
              <Text style={styles.OpcoesText}>Histórico de cadastros</Text>
            </View>
            <Feather
              style={styles.Seta}
              name="chevron-right"
              size={25}
              color={"#252525"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: Platform.OS === 'android' ? statusBarHeight : 25,
  },

  ScrollView: {},

  H3: {
    marginTop: 15,
    marginLeft: 30,
    marginBottom: 15,
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
  },

  Informacoes: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  PerfilImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
  },

  PerfilName: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },

  PerfilEmail: {
    fontFamily: "Montserrat-Medium",
    marginTop: 5,
    fontSize: 15,
    // color: '#7E7E7E'
  },

  BotaoEditar: {
    display: "flex",
    alignSelf: "center",
    marginBottom: 20,
  },

  EditarButton: {
    backgroundColor: "#007CE0",
    width: 130,
    height: 37,
    borderRadius: 10,
  },

  EditarButtonText: {
    marginTop: 10,
    fontSize: 13,
    fontFamily: "Montserrat-Bold",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
  },

  CamposContainer: {
    marginTop: 20,
  },

  Campos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 5,
  },

  Componentes: {
    flexDirection: "row",
    alignItems: "center",
    width: 280,
    justifyContent: "space-between",
  },

  IconsOpcoes: {
    resizeMode: "contain",
    width: 25,
  },

  OpcoesText: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    marginLeft: 15,
  },
  Seta: {
    resizeMode: "contain",
    width: 25,
  },

  modalScrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 80,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "92%",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 20,
  },

  modalScrollView: {
    width: "100%",
  },

  modalText: {
    marginTop: 35,
    fontSize: 16,
    textAlign: "justify",
    fontFamily: "Montserrat-Medium",
  },
  modalButton: {
    backgroundColor: "#252525",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
});
