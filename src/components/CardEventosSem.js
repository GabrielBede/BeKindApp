import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

const CardEventosSem = ({ ongPerfilSource, nome, data }) => {
  return (
    <ScrollView>
      <View style={styles.ContEvenSemana}>
        <View style={styles.EvenImg}>
          <Image style={styles.Icon} source={ongPerfilSource} />
          <View>
            <Text style={styles.PBold}>{nome}</Text>
            <Text style={styles.PBlack}>{data}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity>
              <Text style={styles.PBoldBlue}>Ver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ContEvenSemana: {
    flexDirection: "row",
    alignItems: "center",
    width: "85%",
    height: 75,
    marginHorizontal: 30,
    marginVertical: 3,
  },

  EvenImg: {
    flexDirection: "row",
    alignItems: "center",
  },

  Icon: {
    width: 65,
    height: 65,
    resizeMode: "contain",
    marginRight: 30,
  },

  PBlack: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },

  PBold: {
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    color: "#252525",
  },

  PBoldBlue: {
    color: "#007CE0",
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
  },
});

export default CardEventosSem;
