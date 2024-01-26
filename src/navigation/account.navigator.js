import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import Cadastro from "../pages/Cadastro/Cadastro";
import Carrossel from "../pages/Carrossel/Carrossel";
import Login from "../pages/Login/Login";
import RedefinirSenha from "../pages/Login/RedefinirSenha";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Carrossel"
      component={Carrossel}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Cadastro"
      component={Cadastro}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RedefinirSenha"
      component={RedefinirSenha}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
