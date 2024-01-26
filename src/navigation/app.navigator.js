import React from "react";
import { View, Image } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";

import Perfil from "../pages/Perfil/Perfil";
import EditarPerfil from "../pages/Perfil/EditarPerfil";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Notificacoes from "../pages/Notificacoes/Notificacoes";
import VulneraveisCadastrados from "../pages/VulneraveisCadastrados/VulneraveisCadastrados";
import Descricao1 from "../pages/DescricaoCadastro/Descricao1";
import InfoEventos from "../pages/InfoEventos/InfoEventos";
import InfoONG from "../pages/InfoONG/InfoONG";
import InfoONGUnitario from "../pages/InfoONG/InfoONGUnitario";
import Blog from "../pages/Blog/Blog";
import Premiacoes from "../pages/Premiacoes/Premiacoes";
import DoarDinheiro from "../pages/DoarDinheiro/DoarDinheiro";
import PerfilONG from "../pages/PerfilONG/PerfilONG";
import InfoCards from "../pages/Mais/InfoCards";
import CriarCard from "../pages/Mais/CriarCard";
import CriarEvento from "../pages/Mais/CriarEvento";
import EditarCard from "../pages/Mais/EditarCard";
import EditarEvento from "../pages/Mais/EditarEvento";
import Mensagens from "../pages/Mensagens/Mensagens";
import Chat from "../pages/Mensagens/Chat";


import Routes from "../pages/routes";

import BotaoPerfil from "../components/BotaoPerfil";
import HeaderChatCall from "../components/HeaderChatCall";
import HeaderChatPerfil from "../components/HeaderChatPerfil";
import BotaoCadastros from "../components/BotaoCadastros";
import { DataContextProvider } from "../services/data/data.context";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <DataContextProvider>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Routes}
        options={({ navigation }) => ({
          headerLeft: () => {
            return (
              <BotaoCadastros
                onPress={() => navigation.navigate("VulneraveisCadastrados")}
              />
            );
          },
          headerTitle: () => (
            <Image
              source={require("../img/Logo.png")}
              style={{
                width: 30,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          ),

          headerRight: () => {
            return (
              <BotaoPerfil onPress={() => navigation.navigate("Perfil")} />
            );
          },

          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            shadowColor: "#444444",
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            elevation: 8,
          },
        })}
      />

      <Stack.Screen
        name="Doacoes"
        component={Routes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Eventos"
        component={Routes}
        options={{ headerShown: false }}
      />



      <Stack.Screen
        name="Mais"
        component={Routes}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),

          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="Notificacoes"
        component={Notificacoes}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerTitle: () => (
              <HeaderChatPerfil onPress={() => navigation.navigate("Perfil")} />
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
            shadowColor: "#007CE0",
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            elevation: 8,
          },

          headerRight: () => {
            return (
              <HeaderChatCall onPress={() => navigation.navigate("Perfil")} />
            );
          },
        }}
      />
      <Stack.Screen
        name="CriarCard"
        component={CriarCard}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="CriarEvento"
        component={CriarEvento}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="EditarCard"
        component={EditarCard}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="EditarEvento"
        component={EditarEvento}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="InfoCards"
        component={InfoCards}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="Configuracoes"
        component={Configuracoes}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="InfoEventos"
        component={InfoEventos}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="InfoONG"
        component={InfoONG}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="InfoONGUnitario"
        component={InfoONGUnitario}
        options={{
          title: "",
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      />

      <Stack.Screen
        name="VulneraveisCadastrados"
        component={VulneraveisCadastrados}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />
      <Stack.Screen
        name="Descricao1"
        component={Descricao1}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="Blog"
        component={Blog}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              source={require("../img/Logo.png")}
              style={{
                width: 30,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          ),

          headerRight: () => {
            return (
              <BotaoPerfil onPress={() => navigation.navigate("Perfil")} />
            );
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            shadowColor: "#AAAAAA",
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            elevation: 8,
          },
        })}
      />

      <Stack.Screen
        name="Premiacoes"
        component={Premiacoes}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="DoarDinheiro"
        component={DoarDinheiro}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="Mensagens"
        component={Mensagens}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../img/Logo.png")}
                style={{
                  width: 30,
                  resizeMode: "contain",
                  alignSelf: "center",
                }}
              />
            </View>
          ),
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: "#fff",
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="PerfilONG"
        component={PerfilONG}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Image
              source={require("../img/Logo.png")}
              style={{
                width: 30,
                resizeMode: "contain",
                alignSelf: "center",
              }}
            />
          ),

          headerRight: () => {
            return (
              <BotaoPerfil onPress={() => navigation.navigate("Perfil")} />
            );
          },
          headerTitleAlign: "center",
          headerTintColor: "#000",
          headerStyle: {
            shadowColor: "#AAAAAA",
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            elevation: 8,
          },
        })}
      />
    </Stack.Navigator>
  </DataContextProvider>
);
