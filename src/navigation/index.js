import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../services/authentication/authentication.context";
import Loading from "../pages/Loading/Loading";

export const Navigation = () => {
  const auth = useContext(AuthenticationContext);
  const user = auth.user;

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <AccountNavigator />}
      {user == true && <AppNavigator />}
    </NavigationContainer>
  );
};
