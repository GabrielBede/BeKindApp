import { Pressable, StyleSheet, Image } from "react-native";

function BotaoCadastros({ onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Image style={styles.image} source={require("../img/notificacao2.png")} resizeMode="contain"/>
    </Pressable>
  );
}

export default BotaoCadastros;

const styles = StyleSheet.create({
  image: {
    width: 28,
    height: 28,
    margin: 35,
},
pressed: {
    opacity: 0.8,
}
});
