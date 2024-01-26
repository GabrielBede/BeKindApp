import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Image } from "react-native";

function HeaderChat({onPress}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
            <Feather
              style={styles.image}
              name="phone-call"
              size={23}
              color={'#7E7E7E'}
            />
    </Pressable>
  );
}

export default HeaderChat;

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    margin: 35,
},
pressed: {
    opacity: 0.8,
}
});
