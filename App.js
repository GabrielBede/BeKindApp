import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";

import { useFonts } from "expo-font";

import { Navigation } from "./src/navigation/index";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <>
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
