import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { useState } from "react";

const Post = ({ nomeUsuario, legenda, profilePic, postBg, onProfilePress }) => {
  const [isLiked, setIsLiked] = useState(false);
  const TruncatedText = ({ text, maxLength, onPressReadMore }) => {
    if (text.length > maxLength) {
      const truncatedText = text.substring(0, maxLength - 3);
      return (
        <Text>
          {truncatedText}

          <Text style={{ color: '#CCCCCC' }}>
            ... Ler Mais
          </Text>
        </Text>
      );
    } else {
      return <Text>{text}</Text>;
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={onProfilePress}>
        <View style={styles.PerfilBlog}>
          <Image style={styles.PostPerfil} source={{ uri: profilePic }} />
          <Text style={styles.PostUser}>{nomeUsuario}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.Post}>
        <ImageBackground style={styles.ImagePost} source={{ uri: postBg }}>
          {/* Curtir Post */}
          <View style={styles.Curtir}>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <View style={{ width: 50 }}>
                <Image
                  style={styles.Like}
                  source={
                    isLiked
                      ? require("../img/CurtirBlue.png")
                      : require("../img/Curtir.png")
                  }
                />
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.PostTexto}>
        <Text style={styles.PBlack}>
          <Text style={styles.PBoldBlack}>{nomeUsuario}: </Text>
          <TruncatedText
            text={legenda}
            maxLength={107} // Limite de caracteres visíveis
            onPressReadMore={() => {
              // Implemente a lógica desejada para "Ler Mais"
              console.log("Ler Mais clicado!");
            }}
          />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  PBoldBlack: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#252525",
  },

  PBlack: {
    color: "#252525",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  PerfilBlog: {
    flexDirection: "row",
    marginLeft: 35,
    marginBottom: 10,
  },

  Post: {
    alignSelf: "center",
    backgroundColor: "black",
    width: "85%",
    height: 362,
    borderRadius: 25,
    overflow: "hidden", // Important to ensure the child (ImageBackground) stays within the boundaries
  },

  ImagePost: {
    width: "100%",
    height: "100%",
    position: "relative", // Needed to position child elements (like the "Curtir" view) within this container
  },

  PostPerfil: {
    alignSelf: "center",
    width: 35,
    height: 35,
    borderRadius: 50,
  },

  PostUser: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    marginLeft: 8,
    color: "#252525",
  },

  Like: {
    alignSelf: "center",
    width: 20,
    resizeMode: "contain",
  },

  PostTexto: {
    margin: 30,
    marginTop: 15,
  },

  Curtir: {
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 8,
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center", // Add this line to center the content horizontally and vertically
  },
});

export default Post;
