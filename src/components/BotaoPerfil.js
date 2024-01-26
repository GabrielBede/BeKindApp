import React from "react";
import { useContext } from "react";
import { Pressable, Image, StyleSheet } from "react-native";
import { DataContext } from "../services/data/data.context";

function BotaoPerfil({ onPress }) {
  const { userData } = useContext(DataContext);
  const hasProfilePic =
    userData.avatar !== null &&
    userData.avatar !== undefined &&
    userData.avatar !== "";
 
  return (
    <Pressable
      onPress={onPress} 
      style={({ pressed }) => pressed && styles.pressed}
    >
      {hasProfilePic ? (
        <Image style={styles.image} source={{ uri: userData.avatar }} />
      ) : (
        <Image
          style={styles.image}
          source={require("../img/Perfil.png")}
        />
      )}
    </Pressable>
  );
}

export default BotaoPerfil;

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    margin: 35,
    borderRadius: 50,
  },
  pressed: {
    opacity: 0.8,
  },
});
